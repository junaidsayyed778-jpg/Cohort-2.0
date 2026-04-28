import cartModel from "../models/cartModel.js";
import paymentModel from "../models/paymentModel.js";
import productModel from "../models/productModel.js";
import { createOrder } from "../services/paymentService.js";
import crypto from "crypto";
import { config } from "../config/config.js";

// Helper: build enriched cart response with server-side totals
async function buildCartResponse(cart) {
  let subtotal = 0;
  const enrichedItems = [];

  for (const item of cart.items) {
    const product = await productModel.findById(item.product);
    if (!product) continue;

    const variant = item.variantId ? product.variants.id(item.variantId) : null;
    
    // If a variant is specified in the cart item but not found on the product, skip it
    if (item.variantId && !variant) continue;

    const unitPrice =
      variant?.price?.amount ?? product.price?.amount ?? 0;
    const currency =
      variant?.price?.currency ?? product.currency ?? "INR";
    const lineTotal = unitPrice * item.quantity;
    subtotal += lineTotal;

    enrichedItems.push({
      _id: item._id,
      productId: product._id,
      variantId: variant?._id || null,
      title: product.title,
      description: product.description,
      variantTitle: variant?.title || null,
      attributes: variant?.attributes
        ? (variant.attributes instanceof Map
            ? Object.fromEntries(variant.attributes)
            : { ...variant.attributes })
        : {},
      images:
        variant?.images?.length > 0 ? variant.images : product.images,
      price: {
        amount: unitPrice,
        currency,
      },
      lineTotal,
      quantity: item.quantity,
      stock: variant ? variant.stock : 999, // Fallback high stock if no variant tracking
    });
  }

  return {
    _id: cart._id,
    user: cart.user,
    items: enrichedItems,
    subtotal,
    currency: enrichedItems[0]?.price?.currency ?? "INR",
    itemCount: enrichedItems.reduce((acc, i) => acc + i.quantity, 0),
  };
}

// GET /api/cart
export async function getCart(req, res) {
  try {
    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { items: [], subtotal: 0, itemCount: 0 },
      });
    }

    const enriched = await buildCartResponse(cart);
    return res.status(200).json({ success: true, cart: enriched });
  } catch (err) {
    console.error("getCart error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch cart", error: err.message });
  }
}

// POST /api/cart   body: { productId, variantId, quantity? }
export async function addToCart(req, res) {
  try {
    const { productId, variantId, quantity = 1 } = req.body;

    // Validate product exist
    const product = await productModel.findById(productId);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    // If variantId is provided, validate it exists
    let variant = null;
    if (variantId) {
      variant = product.variants.id(variantId);
      if (!variant)
        return res.status(404).json({ success: false, message: "Variant not found" });
      
      if (variant.stock < 1)
        return res.status(400).json({ success: false, message: "Out of stock" });
    }

    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
      cart = new cartModel({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (i) =>
        i.product.toString() === productId &&
        (variantId ? i.variantId?.toString() === variantId.toString() : !i.variantId)
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({ product: productId, variantId: variantId || null, quantity: Number(quantity) });
    }

    await cart.save();

    const enriched = await buildCartResponse(cart);
    return res
      .status(200)
      .json({ success: true, message: "Added to cart", cart: enriched });
  } catch (err) {
    console.error("addToCart error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add to cart", error: err.message });
  }
}

// PATCH /api/cart/:productId/:variantId   body: { quantity }
export async function updateCartQuantity(req, res) {
  try {
    const { productId, variantId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1)
      return res.status(400).json({ success: false, message: "Invalid quantity" });

    const cart = await cartModel.findOne({ user: req.user._id });
    if (!cart)
      return res.status(404).json({ success: false, message: "Cart not found" });

    const item = cart.items.find(
      (i) =>
        i.product.toString() === productId &&
        (variantId !== "null" && variantId !== "undefined" ? i.variantId?.toString() === variantId : !i.variantId)
    );

    if (!item)
      return res.status(404).json({ success: false, message: "Item not found in cart" });

    item.quantity = Number(quantity);
    await cart.save();

    const enriched = await buildCartResponse(cart);
    return res
      .status(200)
      .json({ success: true, message: "Quantity updated", cart: enriched });
  } catch (err) {
    console.error("updateCartQuantity error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update quantity", error: err.message });
  }
}

// DELETE /api/cart/:productId/:variantId
export async function removeFromCart(req, res) {
  try {
    const { productId, variantId } = req.params;

    const cart = await cartModel.findOne({ user: req.user._id });
    if (!cart)
      return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) =>
        !(
          i.product.toString() === productId &&
          (variantId !== "null" && variantId !== "undefined" ? i.variantId?.toString() === variantId : !i.variantId)
        )
    );

    await cart.save();

    const enriched = await buildCartResponse(cart);
    return res
      .status(200)
      .json({ success: true, message: "Item removed", cart: enriched });
  } catch (err) {
    console.error("removeFromCart error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to remove item", error: err.message });
  }
}

// DELETE /api/cart
export async function clearCart(req, res) {
  try {
    await cartModel.findOneAndUpdate(
      { user: req.user._id },
      { items: [] },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Cart cleared", cart: { items: [], subtotal: 0, itemCount: 0 } });
  } catch (err) {
    console.error("clearCart error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to clear cart", error: err.message });
  }
}

// Helper: Decrement stock for order items
async function decrementStock(orderItems) {
  for (const item of orderItems) {
    if (item.variantId) {
      const product = await productModel.findById(item.productId);
      if (product) {
        const variant = product.variants.id(item.variantId);
        if (variant) {
          variant.stock = Math.max(0, variant.stock - item.quantity);
          await product.save();
        }
      }
    }
  }
}

export const createOrderController = async (req, res) => {
  try {
    const { paymentMethod = "razorpay" } = req.body;
    const cart = await cartModel.findOne({ user: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const cartEnriched = await buildCartResponse(cart);

    let order = null;
    let paymentStatus = "pending";

    if (paymentMethod === "razorpay") {
      order = await createOrder({
        amount: cartEnriched.subtotal,
        currency: cartEnriched.currency,
      });
    } else if (paymentMethod === "cod") {
      // For COD, we don't need a Razorpay order but we can generate a local unique ID if needed
      // paymentStatus remains "pending" until delivery
    }

    const payment = await paymentModel.create({
      user: req.user._id,
      paymentMethod,
      status: paymentStatus,
      razorpay: order ? { orderId: order.id } : undefined,
      price: {
        amount: cartEnriched.subtotal,
        currency: cartEnriched.currency,
      },
      orderItems: cartEnriched.items.map((item) => ({
        title: item.title,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        images: item.images,
        description: item.description,
        price: item.price,
      })),
    });

    if (paymentMethod === "cod") {
      // Clear cart immediately for COD as the order is placed
      cart.items = [];
      await cart.save();

      // Decrement stock for COD
      await decrementStock(payment.orderItems);
    }

    return res.status(200).json({
      success: true,
      message: paymentMethod === "cod" ? "Order placed successfully (COD)" : "Razorpay order created",
      order, // will be null for COD
      paymentId: payment._id,
    });
  } catch (error) {
    console.error("createOrderController error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};



export const verifyOrderController = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", config.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      const payment = await paymentModel.findOne({
        "razorpay.orderId": razorpay_order_id,
      });

      if (!payment) {
        return res
          .status(404)
          .json({ success: false, message: "Payment record not found" });
      }

      payment.status = "paid";
      payment.razorpay.paymentId = razorpay_payment_id;
      payment.razorpay.signature = razorpay_signature;
      await payment.save();

      // Clear the cart after successful payment
      await cartModel.findOneAndUpdate(
        { user: req.user._id },
        { $set: { items: [] } }
      );

      // Decrement stock after successful online payment
      await decrementStock(payment.orderItems);

      return res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("verifyOrderController error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await paymentModel.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("getUserOrders error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const removeOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    await paymentModel.findOneAndDelete({ _id: orderId, user: req.user._id });
    return res.status(200).json({
      success: true,
      message: "Order removed from history",
    });
  } catch (error) {
    console.error("removeOrder error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove order",
      error: error.message,
    });
  }
};

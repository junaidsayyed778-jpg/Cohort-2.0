// backend/src/controllers/productController.js
import productModel from "../models/productModel.js";
import { uploadFile } from "../services/storageService.js";

export async function createProduct(req, res) {
  try {
    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller = req.user;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const images = [];
    for (const file of req.files) {
      const uploadResult = await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname
      });
      images.push(uploadResult);
    }

    const product = new productModel({
      title,
      description,
      price: {
        amount: Number(priceAmount)
      },
      currency: priceCurrency || "INR",
      images,
      seller: seller._id,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      success: true,
      product,
    });
  } catch (err) {
    console.error("Product creation error:", err);
    res.status(500).json({
      message: "Failed to create product",
      error: err.message
    });
  }
}

export async function getSellerProducts(req, res) {
  const seller = req.user

  const products = await productModel.find({ seller: seller._id }).sort({ _id: -1 })

  res.status(200).json({
    message: "Products fetched successfully",
    success: true,
    products
  })
}

export async function getAllProducts(req, res) {
  const { search } = req.query
  let query = {}

  if (search) {
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ]
    }
  }

  const products = await productModel.find(query).sort({ _id: -1 })

  return res.status(200).json({
    message: "Products fetched succcessfully",
    success: true,
    products
  })
}

export async function getProductDetails(req, res) {
  const { id } = req.params

  const product = await productModel.findById(id)

  if (!product) {
    return res.status(404).json({
      message: "Product details not found",
      success: false,
      product
    })
  }

  return res.status(200).json({
    message: "Product details fetched successfully",
    success: true,
    product
  })

}
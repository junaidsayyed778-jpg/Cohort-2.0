import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  createOrderController,
  verifyOrderController,
} from "../controllers/cartController.js";

const router = Router();

// All cart routes require a logged-in user (any role)
router.get("/", authenticateUser, getCart);
router.post("/", authenticateUser, addToCart);
router.patch("/:productId/:variantId", authenticateUser, updateCartQuantity);
router.delete("/:productId/:variantId", authenticateUser, removeFromCart);
router.delete("/", authenticateUser, clearCart);
router.post("/payment/create/order", authenticateUser, createOrderController)
router.post("/payment/verify/order", authenticateUser, verifyOrderController)

export default router;

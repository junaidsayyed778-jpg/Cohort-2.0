import { Router } from "express";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validator/authValidator.js";
import {
  googleCallback,
  login,
  register,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import passport from "passport";

const router = Router();

router.get("/", authMiddleware);
router.post("/register", validateRegisterUser, register);
router.post("/login", validateLoginUser, login);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  googleCallback,
);
export default router;

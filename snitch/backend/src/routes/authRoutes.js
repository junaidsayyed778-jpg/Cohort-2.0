import { Router } from "express";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validator/authValidator.js";
import {
  getMe,
  googleCallback,
  login,
  register,
  logout,
} from "../controllers/authController.js";
import passport from "passport";
import { config } from "../config/config.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", validateRegisterUser, register);
router.post("/login", validateLoginUser, login);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "https://cohort-2-0-b7p9.onrender.com/#/login",
  }),
  googleCallback,
);
router.get("/me", authenticateUser, getMe)
router.post("/logout", logout)
export default router;

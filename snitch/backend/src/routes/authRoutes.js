import {Router} from "express"
import { validateLoginUser, validateRegisterUser } from "../validator/authValidator.js"
import { login, register } from "../controllers/authController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = Router()

router.get("/", authMiddleware)
router.post("/register", validateRegisterUser, register)
router.post("/login", validateLoginUser, login)

export default router
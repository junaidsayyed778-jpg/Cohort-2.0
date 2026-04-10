import {Router} from "express"
import { validateLoginUser, validateRegisterUser } from "../validator/authValidator.js"
import { login, register } from "../controllers/authController.js"

const router = Router()

router.post("/register", validateRegisterUser, register)
router.post("/login", validateLoginUser, login)

export default router
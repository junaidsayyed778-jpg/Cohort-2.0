import {Router} from "express"
import { validateRegisterUser } from "../validator/authValidator.js"
import { register } from "../controllers/authController.js"

const router = Router()

router.post("/register", validateRegisterUser, register)
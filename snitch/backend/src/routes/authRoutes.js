import {Router} from "express"
import { validateRegisterUser } from "../validator/authValidator"

const router = Router()

router.post("/register", validateRegisterUser,)
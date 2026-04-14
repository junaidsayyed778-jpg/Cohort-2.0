import {Router} from "express"
import authenticateSeller from "../middleware/authMiddleware.js"
const router = Router()

router.post("/", authenticateSeller)
export default router
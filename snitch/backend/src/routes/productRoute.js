import {Router} from "express"
import authenticateSeller from "../middleware/authMiddleware.js"
import multer from "multer"
import { createProduct, getSellerProducts } from "../controllers/productController.js"

const router = Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})
router.post("/", authenticateSeller, upload.array("images", 7), createProduct)
router.get("/", authenticateSeller, getSellerProducts)
export default router
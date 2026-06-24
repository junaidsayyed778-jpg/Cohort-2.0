const express = require("express")
const { getAccessTokenController, registerController, loginController } = require("../controller/authController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

router.get("/me", authMiddleware, (req, res)=> {
    return req.status(200).json({
        message: "urrently loggedIn user",
        user: req.user
    })
})

router.get("/get-accessToken", getAccessTokenController)

router.post("/register", registerController)
router.post("/login", loginController)

module.exports = router;
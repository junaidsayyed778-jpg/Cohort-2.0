import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";

const authenticateSeller =async  (req, res, next)=>{
    try{
        const token = req.cookies?.token;

        if(!token){
            return res.redirect("/login");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById({
            message: "Unathorized"
        })

        if(user.role !== "seller"){
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        req.user = user
        next();
    }catch(err){
        return res.redirect("/login")
    }
}

export default authenticateSeller
import userModel from "../models/userModel"
import jwt from "jsonwebtoken"

async function sendTokenResponse(user, res){
    const token = jwt.sign({
        id: user._id,
    })
}
export const register = async (req, res)=>{
    const { email, contract , password , fullname} = req.body

    try{
        const existingUser = await userModel.findOne({
            $or:[
                {email},
                {contract}
            ]
        })

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const user = await userModel.create({
            email,
            contract,
            password,
            fullname
        })
    }catch(err){
        console.log("error")
        return res.status(500).json({
            message: "Server error"
        })
    }
}
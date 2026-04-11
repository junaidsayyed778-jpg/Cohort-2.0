import jwt, { decode } from "jsonwebtoken"

const authMiddleware = (req, res, next)=>{
    try{
        consttoken = req.cookies?.token;
        if(!token){
            return res.redirect("/login");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next();
    }catch(err){
        return res.redirect("/login")
    }
}

export default authMiddleware
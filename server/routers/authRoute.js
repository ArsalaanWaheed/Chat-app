import  {Router}  from "express";
import  {login, signup} from "../controllers/authController.js";
import passport from "passport";



const authRouter=Router()
authRouter.post("/signup",
 signup)

authRouter.post("/login", (req,res,next)=>{ passport.authenticate("local",(err,user,info)=>{
  if(err) return next(err);
  if(!user){
    return  res.status(401).json({message:"Invalid username or password"});

  }
  req.login(user,(err)=>{
    if(err) {
      return next(err);}
      res.send({message:"Logged In Successfully"});
    }
  )
})})




export default authRouter;
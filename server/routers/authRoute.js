import  {Router}  from "express";
import  {login, signup} from "../controllers/authController.js";
import passport from "passport";



const authRouter=Router()
authRouter.post("/signup",
 signup)

authRouter.post("/login", (req,res,next)=>{ passport.authenticate("local",{session:true},(err,user,info)=>{
  if(err) return next(err);
  if(!user){
    return  res.status(401).json({message:"Invalid username or password"});

  }
  req.login(user,(err)=>{
    if(err) {
      return next(err);}
      res.status(200).json({message:"Logged In Successfully"});
    }
  );
  login
})})




export default authRouter;
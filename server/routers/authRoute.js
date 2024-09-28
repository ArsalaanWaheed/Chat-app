import  {Router}  from "express";
import  {login, signup} from "../controllers/authController.js";
import passport from "passport";



const authRouter=Router()
authRouter.post("/signup",
 signup)

authRouter.post("/login",  passport.authenticate("local",{
    failureRedirect:"http://localhost:5173/auth",
    failureMessage:true,
    
  }),login

)

export default authRouter;
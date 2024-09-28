import User from "../models/userModel.js"


export const signup =async(req,res,next)=>{
    let {email,username,password,}=req.body;
    console.log(req.body);
    let newUser=new User({email,username});

    let regUser=await User.register(newUser,password);

res.send("done");


}

export const login =async(req,res,next)=>{
    console.log("logged in successfully");
    res.send("successfull")
}
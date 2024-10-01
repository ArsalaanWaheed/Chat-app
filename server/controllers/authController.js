import User from "../models/userModel.js"
import jwt from  "jsonwebtoken";

const maxAge=3*24*60*60*1000;

// const createToken=(email,userId)=>{
//     return jwt.sign({email,userId},process.env.SECRET_KEY,{expiresIn:maxAge})

// };

export const signup =async(req,res,next)=>{
   
    // const {username,email,password}=req.body;
    // if(!email || !password  || !username){
    //     return res.status(400).json({msg:"Please enter all fields"})

    // }
    // const user=new User(req.body)
    let newUser=new User({email,username});

    let regUser=await User.register(newUser,password);

    req.login(regUser,((err)=>{
        if(err) return next(err);
        res.redirect('/');
    }))

res.send("done");


}

export const login =async(req,res,next)=>{
    let {username,password,}=req.body;
    console.log(req.body);
//     if(!email ||  !username || !password){     
//         return res.status(400).json({message:"Please fill in all fields"});
//     }
//     const user = await User.findOne({username});
//     if(!user){
//   return res.status(404).send("user with given username is not found");
//     }
//     cons
//       });
}
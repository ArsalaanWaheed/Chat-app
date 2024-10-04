import express from "express";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import {Strategy as localStrategy} from "passport-local"
import User from "./models/userModel.js";
import session  from "express-session";
import authRouter from "./routers/authRoute.js";
import { compareSync } from "bcrypt";


dotenv.config();

const app=express();
const port=process.env.PORT || 3000;
const databaseUrl=process.env.DATABASE_URL;

const server=app.listen(port,()=>{
    console.log("listening on port ",port)
})

async function main(){
    await mongoose.connect(databaseUrl);

}
main()
.then((result)=>console.log("database connected"))
.catch((error)=>console.log(error))

app.use(session({
    secret:"topSecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
        httpOnly:true,
        }
}))

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PATCH","PUT","DELETE"],
    credentials:true,
}))
app.use(passport.initialize());
app.use(passport.session())
// // passport.use(new localStrategy(
// //     function(username, password, done) {
// //       User.findOne({ username: username })
// //         .exec()
// //         .then((user) => {
// //           if (!user) { return done(null, false); }
// //           try {
// //             if (user.password!==(password)) { return done(null, false); }
// //             return done(null, user);
// //           } catch (err) {
// //             return done(err);
// //           }
// //         })
// //         .catch((err) => {
// //           return done(err);
// //         });
// //     }
// //   ));
// User.verifyPassword = function(password) {
//     return bcrypt.compareSync(password, this.password); // Ensure 'this.password' is the hashed password
//   };

passport.use(new localStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false); // User not found
      }
      if (!compareSync(password, user.password)) {
        return done(null, false); // Password incorrect
      }
      return done(null, user); // Successful authentication
    } catch (err) {
      return done(err); // Handle errors
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id); // Serialize user ID
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/api/auth" ,authRouter);
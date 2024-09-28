import{Schema} from "mongoose";
import mongoose from "mongoose";
import  passportLocalMongoose from "passport-local-mongoose"


const userSchema =Schema({
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    profileSetup:{
type:Boolean,
default:false,
    }
})

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("User",userSchema);

export default User;
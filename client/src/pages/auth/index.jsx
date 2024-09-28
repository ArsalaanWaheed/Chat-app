import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
import { SIGNUP_ROUTE } from "@/utils/constants"
import axios from "axios"


const Auth = () => {
  let [formDataLogin, setformDataLogin] = useState({username:"",password:""})
  let [formDataSignup, setformDataSignUp] = useState({email:"" ,username:"",password:"",confirmpassword:""})

  function handleFormChangeLogin(event){
    setformDataLogin((preData)=>{
      return {...preData,[event.target.name]:event.target.value}
    })

  }
  function handleFormChangeSignUp(event){
    setformDataSignUp((preData)=>{
      return {...preData,[event.target.name]:event.target.value}
    })

  }
const validateSignUp=()=>{
  if(!formDataSignup.email.length){
   toast.error("email is required")
   return false;
  }
  else if(!formDataSignup.username.length){
    toast.error("username is required")
    return false;
   }
   else if(!formDataSignup.password.length){
    toast.error("password is required")
    return false;
   }
   else if(!formDataSignup.confirmpassword.length){
    toast.error("password is required")
    return false;
   }
   else if(formDataSignup.password!=formDataSignup.confirmpassword){
    toast.error("password should be same")
    return false;
   }
   else {
    return true;
   }
}
  
   async function handleFormSubmitLogin(){
    if(!formDataLogin.username.length){
      toast.error("username is required")
    return false;
    }
    else if(!formDataLogin.password.length){
      toast.error("password is required")
    return false;
    }
  else{
    console.log(formDataLogin);
    let result = await axios.post("http://localhost:8747/api/auth/login",{...formDataLogin});
    console.log(result);
  }
    
  }
  async function handleFormSubmitSignUp(){
    if(validateSignUp()){
      
      let result = await axios.post("http://localhost:8747/api/auth/signup",{...formDataSignup});
      console.log(result);

    }
  }

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center ">
      <div className="h-[80vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl rounded-3xl md:w-[90vw] lg:w-[70vw] xlg:w-[60vw] grid xl:grid-cols-2">
      <div className="flex flex-col gap-10 items-center justify-center"> 
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center justify-center">
          <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
        </div>
        <p className="font-medium text-center">Fill in the details to get started!!!</p>

        </div>
        <div className="flex items-center justify-center w-full">
        <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="password">SignUp</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Username</Label>
              <Input id="name" value={formDataLogin.username} placeholder="Username" name="username" onChange={handleFormChangeLogin} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input id="username" type="password" value={formDataLogin.password} placeholder="Enter your password"  name="password" onChange={handleFormChangeLogin}/>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="rounded-full w-[35vw]" onClick={handleFormSubmitLogin}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          {/* <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader> */}
          <CardContent className="space-y-2 pt-4 ">
            <div className="space-y-1">
              <Label htmlFor="current">Email</Label>
              <Input id="current" name="email" value={formDataSignup.email} type="text" onChange={handleFormChangeSignUp}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Username</Label>
              <Input id="new" type="text" name="username" value={formDataSignup.username} onChange={handleFormChangeSignUp} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pass">Password</Label>
              <Input id="pass" type="password" name="password" value={formDataSignup.password} onChange={handleFormChangeSignUp}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="passnew">Confirm Password</Label>
              <Input id="passnew" type="password" name="confirmpassword" value={formDataSignup.confirmpassword} onChange={handleFormChangeSignUp} />
            </div>
          </CardContent>
          <CardFooter className="">
          <Button className="rounded-full w-[35vw]" onClick={handleFormSubmitSignUp}>SignUp</Button>
            
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>

        </div>
      </div>
      </div>
    </div>
  );
};

export default Auth;

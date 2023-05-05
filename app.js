const express = require("express");
const app= express();
const mongoose= require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "idhfuifuwhodfuyduhbhbduyfyufgwjdhfbdhjbubcbf65984843548vvkjhwdbchvcv";

//Starting server

app.listen(5000,()=>{
    console.log("Server Started");
})


//connecting to database

const mongoUrl = "mongodb+srv://priyanat2205:priyanat2205@gtc.5gbbhon.mongodb.net/test";
mongoose.connect(mongoUrl,{useNewUrlParser:true}).then(()=>{
    console.log("Connected to database");
}).catch((e)=>{
    console.log(e);
})


require("./userDetail");
const User = mongoose.model("UserInfo");

//Register the user details
app.post("/register",async(req,res)=>{
    const {fname,lname,email,password} =req.body;
    const encryptedPassword = await bcrypt.hash(password,10);
    try {
        const oldUser = await User.findOne({email});
        if(oldUser){
           return res.json({
                error:"User Exists"
            });
        }
        await User.create({fname,
            lname,
            email,
        password:encryptedPassword
    })
        
        res.send({status:"ok"})
    } catch (error) {
        res.send({status:"error"})
    }
});



//Login
app.post("/login-user",async (req,res)=>{
    const{email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.json({error:"User Not found"});
    }
    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({email:user.email},JWT_SECRET);
        if(res.status(201)){
            return res.json({status:"ok",data:token})
        }else{
            return res.json({error:"error"});
        }
    }
    res.json({status:"error",error:"Invalid Password"});

})


//Get uder details
app.post("/userData",async(req,res)=>{
    const{token}=req.body;
    try {
        const user = jwt.verify(token,JWT_SECRET);
        const useremail = user.email;
        User.findOne({email:useremail})
        .then((data)=>{
            res.send({status:"ok",data:data})
        })
        .catch((error)=>{
            res.send({status:"error",data:error})
            })
            
    } catch (error) {
        
       console.log(error);
    }
})




//index.js
var gmail = require("./Gmail");
gmail.readInboxContent("Contribution_Type:").then((data)=>{
    console.log("All Contributions:");
    console.log(data);
   

}).catch((error)=>{
    console.log(error);
});



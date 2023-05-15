import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose
.connect("mongodb://127.0.0.1:27017",{
    dbName : "backend",
})
.then(()=>console.log("Database connected"))
.catch((e)=>console.log(e));

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", schema);
app.get("/",(req,res) => {
    res.send("Nice working");
});

app.get("/users/all",async(req,res) => {
    const users = await User.find({});
    
    res.json({
        success:true,
        users:[]
    });
});
app.listen(4000, ()=>{
    console.log("Server is running");
});
import {User} from "../modals/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";

//GetAllusers
export const getAllUsers = async (req,res) => {};

//Login
export const login = async(req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user)
    {
        return res.status(404).json({
            success: false,
            message: "Invalid email or password"

        });
    }
    const isMatch = await bcrypt.compare(password,user.password);

    if(user)
    {
        return res.status(404).json({
            success: false,
            message: "Invalid email or password"

        });
    }
    sendCookie(user, res , `Welcome back,${user.name}`,200);

};

//Regiter
export const register = async(req, res) => {
    const {name, email, password} = req.body;

    let user = await User.findOne({email});
    if(user)
    {
        return res.status(404).json({
            success: false,
            message: "Invalid email or password"

        });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    user = await User.create({name , email, password: hashedPassword});

    const token = jwt.sign({_id:user._id }, process.env.JWT_SECRET);

    res.status(201).cookie("token",token,{
        httpOnly: true,
        maxAge: 15*60*1000,
    })
    .json({
        success: true,
        message: "Registered successfully",
    })
    sendCookie(user,res,"Registered Successfully",201);
};

//getmyprofile
export const getMyProfile = (req, res) =>{

    res.status(200).json({
        success: true,
        user: req.user,
    });
};

//logout
export const logout  = (req, res) =>{

    res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
        success: true,
        user: req.user,
    });
};
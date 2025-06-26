import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req,res) => {
    try {
        const {username,email,password} = req.body;

        const exists = await User.findOne({email});
        if(exists) return res.status(400).json({message: "User already exists"});
        const newUser = new User({
            username,
            email,
            password
        });
        await newUser.save();
        res.status(201).json({message: "User registered successfully"})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message: "Please provide email and password"});
        }
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "User does not exist"});

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({message: "Invalid Credentials"});

        const token = jwt.sign({id : user._id, username: user.username}, process.env.JWT_SECRET,{
            expiresIn: "1d"
        });

        res.status(200).json({token, user: {user: user._id, name: user.username}});
    } catch (error) {
        res.status(500).json({message: "Login Failed", error: error.message});
    }
}
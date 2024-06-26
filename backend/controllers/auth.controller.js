import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const login = async (req, res) => {
   try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrenct = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrenct) {
        return res.status(400).json({error:"Invalid username or password"})
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
        _id: user._id,
        fullName:user.fullName,
        username:user.username,
        profilePic:user.profilePic,
    });
   } catch (error) {
    console.error("Erroe in login controller", error.massage)
    res.status(500).json({error: "Internal Server Error"})
   }
}

export const logout =  (req, res) => {
    try {
        res.cookie("jwt","", {maxAge:0});
        res.status(200).json({massage:"Logged out successfully"});
    } catch (error) {
    console.error("Erroe in logout controller", error.massage);
    res.status(500).json({error: "Internal Server Error"});
    }
}

export const signup = async (req, res) => {
    try {
        const {fullName, username,password,confirmePassword,gender} =req.body
        if (password !== confirmePassword) {
            return res.status(400).json({error:"Passwords dont't match"})
        }
        const user = await User.findOne({username})
        if (user) {
            return res.status(400).json({error:"Username already exists"})
        }

        // hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic
        })
        } else {
            res.status(400).json({error: "Invalid user data"});
        }
    } catch (error) {
        console.error("Error in signup controller", error.massage)
        res.status(500).json({error: "Internal Server Error"})
    }
}
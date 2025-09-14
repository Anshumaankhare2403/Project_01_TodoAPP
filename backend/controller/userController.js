
import User from "../model/userAuth.js";

import jwt from "jsonwebtoken";
import argon2 from "argon2";


export const handelUserSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter the email and password" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare password (method is in user schema)
        const isPass = await argon2.verify(user.password, password);
        if (!isPass) {
            return res.status(400).json({ message: "Invalid  password" });
        }



        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            "TodoAPP", // use env secret in production
            { expiresIn: "1h" }
        );

        // Success response (never send password back!)
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};




export const handelUserSignup = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Optional: validate phone number
        if (phone && !/^\+?\d{10,15}$/.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number" });
        }

        // Hash password
        const hashedPassword = await argon2.hash(password);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || "user", // default role
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET || "TodoAPP", // use env secret in production
            { expiresIn: "1h" }
        );

        // Respond
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                phone: newUser.phone,
            },
            token,
        });
    } catch (error) {
        console.error(error); // always log backend errors
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
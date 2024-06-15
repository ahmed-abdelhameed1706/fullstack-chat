import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, fullName, password, confirmPassword, gender } = req.body;
    // Check if password and confirmPassword are the same
    if (!username || !fullName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    // Check if the username already exists
    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Save the user to the database
    const newUser = await prisma.user.create({
      data: {
        username,
        fullName,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      },
    });

    // Generate token
    if (newUser) {
      // Generate token
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
        gender: newUser.gender,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error: any) {
    console.log("Error in signUp controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // Check if the password is correct
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // Generate token
    generateToken(user.id, res);
    res.status(200).json({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out" });
  } catch (error: any) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

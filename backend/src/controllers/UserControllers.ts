import { Request, Response, NextFunction } from "express";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/jwt-token-generator.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const UserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).json({ message: "User Already Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    // create token and store the cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      domain: process.env.NODE_ENV === "production" ? "mern-ai-chatbot-frontend.onrender.com" : "localhost",
      signed: true,
    });
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: process.env.NODE_ENV === "production" ? "mern-ai-chatbot-frontend.onrender.com" : "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res
      .status(201)
      .json({
        message: "SignedUp Successfully",
        name: user.name,
        email: user.email,
      });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const UserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not Registered" });
    }
    const isPassworCorrect = await bcrypt.compare(password, user.password);
    if (!isPassworCorrect) {
      return res.status(400).json({ Message: "Incorrect Password!" });
    }
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      domain: process.env.NODE_ENV === "production" ? "mern-ai-chatbot-frontend.onrender.com" : "localhost",
      signed: true,
    });
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: process.env.NODE_ENV === "production" ? "mern-ai-chatbot-frontend.onrender.com" : "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const VerifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // user token ckecking
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(400).json({ message: "User not Registered Token Malfunctioned" });
    }
    console.log(user._id.toString(), res.locals.jwtData.id);
    
    if (user._id.toString() !==  res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permissions didn't match" }); 
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const UserLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // user token ckecking
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(400).json({ message: "User not Registered Token Malfunctioned" });
    }
    console.log(user._id.toString(), res.locals.jwtData.id);
    
    if (user._id.toString() !==  res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permissions didn't match" }); 
    }
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      domain: process.env.NODE_ENV === "production" ? "mern-ai-chatbot-frontend.onrender.com" : "localhost",
      signed: true,
    });
    
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

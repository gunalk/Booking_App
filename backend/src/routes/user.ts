import express, { Request, Response } from "express";
import User, { UserType } from "../models/user"; // Import UserType for typing
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
const router = express.Router();

router.post("/register",[
  check("firstName","First Name is required").isString(),
  check("lastName","Last Name is required").isString(),
  check("email","Enter Valid Email").isEmail(),
  check("password","password with 6 characters or more character is required").isLength({
    min:6
  }

  ),
] ,async (req: any, res: any) => {
  const errors =validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ message: errors.array() });

  }
  try {
    // Check if the user already exists
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new User(req.body);
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id }, // Pass the userId correctly here
      process.env.JWT_SECRET_KEY as string, // Correctly accessing the secret key
      {
        expiresIn: "1d", // Set token expiration time (1 day)
      }
    );

    // Set the token in the cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensures cookie is only sent over HTTPS in production
      maxAge: 86400000, // Cookie expires in 1 day (86400000ms)
    });

   res.status(200).json({message:"User created successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;

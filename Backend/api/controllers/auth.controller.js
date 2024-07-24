import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send("User not found!");
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(400).send("Invalid credentials!");
    }
    const token = jwt.sign(
      { _id: user._id, isSeller: user.isSeller },
      process.env.JWT_SECRET
    );
    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .send(info);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send(`Error: ${error.message}`);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User logged out successfully!");
};

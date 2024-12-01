import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";

const SECRET_KEY = process.env.JWT_SECRET;

export const loginUser = async ({ emailOrUsername, password }) => {
  if (!emailOrUsername || !password) {
    return { success: false, error: "All fields are required" };
  }

  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, error: "Invalid credentials" };
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      name: user.name,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "5d" }
  );

  return {
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    token,
  };
};

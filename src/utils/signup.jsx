import bcrypt from "bcryptjs";
import User from "@/models/User";

export const createUser = async ({
  username,
  email,
  password,
  phone,
  name,
}) => {
  if (!username || !email || !password || !phone || !name) {
    return { success: false, error: "All fields are required" };
  }

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    return { success: false, error: "Username or email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    phone,
    name,
  });

  await newUser.save();

  return { success: true, message: "User created successfully" };
};

export const createUserWithRole = async ({
  username,
  email,
  password,
  phone,
  name,
  role,
}) => {
  if (!username || !email || !password || !phone || !name) {
    return { success: false, error: "All fields are required" };
  }

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    return { success: false, error: "Username or email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    phone,
    name,
    role
  });

  await newUser.save();

  return { success: true, message: "User created successfully" };
};

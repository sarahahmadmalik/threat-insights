import { getSession } from "next-auth/react";
import { parse } from "cookie";
import jwt from "jsonwebtoken";


export const getSession = async (context) => {
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.auth_token;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; 
  } catch (error) {
    return null;
  }
};

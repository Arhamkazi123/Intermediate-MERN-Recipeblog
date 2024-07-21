import jwt from "jsonwebtoken";
import authmodel from "../models/authmodel.js";

const checkauth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await authmodel.findById(userID).select("--password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

export default checkauth;

import authmodel from "../models/authmodel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (username && email && password) {
      const isUser = await authmodel.findOne({ email: email });
      if (!isUser) {
        const gensalt = await bcryptjs.genSalt(10);
        const hashedpass = await bcryptjs.hash(password, gensalt);

        const newuser = new authmodel({
          username,
          email,
          password: hashedpass,
        });
        const saveduser = await newuser.save();
        if (saveduser) {
          return res.status(200).json({ message: "registration successfull" });
        } else {
          return res.status(400).json({ message: "user not saved" });
        }
      } else {
        return res.status(400).json({ message: "email already exists" });
      }
    } else {
      return res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const isEmail = await authmodel.findOne({ email: email });
      if (isEmail) {
        if (
          isEmail.email === email &&
          (await bcryptjs.compare(password, isEmail.password))
        ) {
          const token = jwt.sign(
            {
              userID: isEmail._id,
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "2d",
            }
          );
          return res.status(200).json({
            message: "Login succesfull",
            token,
            name: isEmail.username,
          });
        } else {
          return res.status(400).json({ message: "wrong credentials" });
        }
      } else {
        return res.status(400).json({ message: "email not found" });
      }
    } else {
      return res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    return res.status(400).json({ message: "outermost problem" });
  }
};

export { register, login };

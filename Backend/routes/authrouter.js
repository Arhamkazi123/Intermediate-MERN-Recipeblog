import express from "express";
import { register, login } from "../controllers/auth-controller.js";
import {
  getallrecipes,
  postrecipes,
} from "../controllers/recipe-controller.js";
import {
  deletesavedrecipes,
  getsavedrecipes,
  postsavedrecipes,
} from "../controllers/savedrecipe-controller.js";
import checkauth from "../middleware/authmiddleware.js";
const authroute = express.Router();

authroute.route("/register").post(register);
authroute.route("/login").post(login);

// protected routes
authroute.route("/getallrecipes").get(checkauth, getallrecipes);
authroute.route("/postrecipe").post(checkauth, postrecipes);

authroute.route("/getsavedrecipes").get(checkauth, getsavedrecipes);
authroute.route("/postsavedrecipes").post(checkauth, postsavedrecipes);
authroute.route("/deletedsavedrecipes").delete(checkauth, deletesavedrecipes);

export { authroute };

import mongoose from "mongoose";

const recipeschema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  timetaken: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refer: "RecipeUsers",
  },
});

const recipemodel = new mongoose.model("recipedata", recipeschema);
export default recipemodel;

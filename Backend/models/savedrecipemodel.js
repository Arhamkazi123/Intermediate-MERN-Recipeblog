import mongoose from "mongoose";

const savedrecipeschema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    refer: "RecipeUsers",
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    refer: "recipedata",
  },
});

const savedrecipemodel = new mongoose.model("savedrecipes", savedrecipeschema);
export default savedrecipemodel;

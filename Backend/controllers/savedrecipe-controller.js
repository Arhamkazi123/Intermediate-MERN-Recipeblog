import recipemodel from "../models/recipemodel.js";
import savedrecipemodel from "../models/savedrecipemodel.js";

const getsavedrecipes = async (req, res) => {
  const userid = req.user._id;

  try {
    // Find all saved recipes for the user and populate both author and recipe fields
    const savedRecipes = await savedrecipemodel
      .find({ author: userid })
      .populate({
        path: "recipe",
        model: "recipedata",
      })
      .populate({
        path: "author",
        model: "RecipeUsers",
        select: "username", // Select only the username field from the author
      });

    if (savedRecipes) {
      res.status(200).json(savedRecipes);
    } else {
      res.status(404).json({ message: "No saved recipes found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postsavedrecipes = async (req, res) => {
  const userid = req.user._id;
  const { recipeid } = req.body; // Extract recipeid from req.body

  try {
    if (userid && recipeid) {
      const newsavedrecipe = new savedrecipemodel({
        author: userid,
        recipe: recipeid,
      });
      const savedsavedrecipe = await newsavedrecipe.save();
      if (savedsavedrecipe) {
        res.status(200).json({ message: "Saved recipe is saved" });
      } else {
        res.status(400).json({ message: "Saved recipe not saved" });
      }
    } else {
      res.status(400).json({ message: "Fill all the fields" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletesavedrecipes = async (req, res) => {
  const { objectid } = req.body;
  try {
    if (objectid) {
      const deletesaved = await savedrecipemodel.findByIdAndDelete(objectid);
      if (!deletesaved) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      return res.status(200).json(deletesaved);
    } else {
      res.status(400).json({ message: "Missing recipe ID" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getsavedrecipes, postsavedrecipes, deletesavedrecipes };

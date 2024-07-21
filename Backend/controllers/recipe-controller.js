import recipemodel from "../models/recipemodel.js";

const getallrecipes = async (req, res) => {
  try {
    const fetchallrecipes = await recipemodel.find({});
    res.status(200).json({ message: fetchallrecipes });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const postrecipes = async (req, res) => {
  const { title, ingredients, timetaken, description } = req.body;
  try {
    if (title && ingredients && timetaken && description) {
      const addrecipe = new recipemodel({
        title: title,
        ingredients: ingredients,
        timetaken: timetaken,
        description: description,
        user: req.user._id,
      });

      const recipesaved = await addrecipe.save();
      if (recipesaved) {
        return res.status(200).json({ message: "Recipe has been created" });
      } else {
        return res.status(400).json({ message: "Data is not saved" });
      }
    } else {
      res.status(400).json({ message: error });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { getallrecipes, postrecipes };

const Category = require("../models/category");

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((error, category) => {
    if (error || category === undefined) {
      return res.status(400).json({
        error: "New category name is not created!",
      });
    }
    res.json({
      message: `${category.name} is created!`,
    });
  });
};

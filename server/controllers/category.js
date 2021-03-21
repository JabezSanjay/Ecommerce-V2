const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "Category not found!",
      });
    }
    req.category = category;
    next();
  });
};

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

exports.getAllCategories = (req, res) => {
  Category.find((error, categories) => {
    if (error) {
      return res.status(400).json({
        error: "No categories found",
      });
    }
    return res.json(categories);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  const oldCategoryName = req.category.name;
  category.name = req.body.name;

  category.save((error, updatedCategory) => {
    if (error) {
      return res.status(400).json({
        error: "Updation of category name failed!",
      });
    }
    return res.json({
      message: `${oldCategoryName} is changed to ${updatedCategory.name}!`,
    });
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((error, deletedCategory) => {
    if (error) {
      return res.status(400).json({
        error: "Category is not deleted!",
      });
    }
    return res.json({
      message: `${deletedCategory.name} is deleted!`,
    });
  });
};

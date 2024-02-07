const Category = require("../models/Category");
const Item = require("../models/Item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.categories_list = asyncHandler(async (req, res, next) => {
  const categories_list = await Category.find({}, "name")
    .sort({ name: -1 })
    .exec();
  res.locals.categories_list = categories_list;
  next();
});

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", {
    title: "Categories",
    description:
      "Shop millions of articles which falls under following categories:",
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, category_items] = await Promise.all([
    Category.findById(req.params.id),
    Item.find({ category: req.params.id }, "name"),
  ]);
  res.render("category_detail", { category, category_items });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", { title: "Add New Category" });
});

exports.category_create_post = [
  body("name")
    .trim()
    .not()
    .isAlpha()
    .withMessage("name should be alphabetical only")
    .escape(),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description should be atleast 10 chars long")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create New Category",
        category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExist = await Category.findOne({ name: category.name })
        .collation({
          locale: "en",
          strength: 2,
        })
        .exec();
      if (categoryExist) {
        res.redirect(categoryExist.url);
      } else await category.save();
      res.redirect(category.url);
    }
  }),
];

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented category update get");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented category update post");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented category delete get");
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented category delete post");
});

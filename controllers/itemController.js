const Category = require("../models/Category");
const Item = require("../models/Item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  res.render("item_detail", { item });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const category_list = await Category.find({}).sort({ name: 1 }).exec();
  res.render("item_form", { title: "Add New Item", category_list });
});

exports.item_create_post = [
  body("name").trim().escape(),
  body("category").not().isEmpty().withMessage("Category is required"),
  body("stock", "stock must be an integer value")
    .trim()
    .isInt()
    .withMessage("Stock must be an integer")
    .escape(),
  body("price")
    .trim()
    .escape(),
  body("description").trim().escape(),
  asyncHandler(async (req, res, next) => {
    const item = new Item({
      name: req.body.name,
      category: req.body.category,
      stock: req.body.stock,
      price: req.body.price,
      description: req.body.description,
    });
    await item.save();
    res.redirect(item.url);
  }),
];

exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented item update get");
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented item update post");
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented item delete get");
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented item delete post");
});

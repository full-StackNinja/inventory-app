const Category = require("../models/Category");
const Item = require("../models/Item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  res.render("item_detail", { item });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const category_list = await Category.find({}).sort({ name: 1 }).exec();
  res.render("item_form", { title: "Add New Item", category_list });
});

exports.item_create_post = [
  upload.single("image"),
  body("name").trim().escape(),
  body("category").not().isEmpty().withMessage("Category is required"),
  body("stock").trim().isInt().withMessage("Stock must be an integer").escape(),
  body("price").trim().escape(),
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
  const [item, category_list] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Category.find({}).sort({ name: 1 }).exec(),
  ]);

  res.render("item_form", { title: "Update Item", item, category_list });
});

exports.item_update_post = [
  body("name").trim().escape(),
  body("category").not().isEmpty().withMessage("Category is required"),
  body("stock", "stock must be an integer value")
    .trim()
    .isInt()
    .withMessage("Stock must be an integer")
    .escape(),
  body("price").trim().escape(),
  body("description").trim().escape(),
  asyncHandler(async (req, res, next) => {
    const item = new Item({
      name: req.body.name,
      category: req.body.category,
      stock: req.body.stock,
      price: req.body.price,
      description: req.body.description,
      _id: req.params.id,
    });
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, item);
    res.redirect(updatedItem.url);
  }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  res.render("item_delete", { item });
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

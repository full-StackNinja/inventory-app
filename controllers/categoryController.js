const Category = require("../models/Category");
const Item = require("../models/Item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Categories" });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send("Not implemented category detail page");
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented create category get");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented category create post");
});

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

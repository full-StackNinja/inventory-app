const Category = require("../models/Category");
const Item = require("../models/Item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send("Not implemented item detail");
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented item create get");
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented item create post");
});

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

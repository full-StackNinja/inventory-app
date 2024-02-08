const asyncHandler = require("express-async-handler");

exports.login_get = asyncHandler(async (req, res, next) => {
  res.render("admin_login");
});

exports.login_post = [
  async (req, res, next) => {
    if (req.body.code === process.env.ADMIN_CODE) {
      req.session.isAdmin = true;
      next();
    } else {
      const error = new Error("Authorization error!");
      next(error);
    }
  },
  asyncHandler(async (req, res, next) => {
    res.redirect(req.query.from);
  }),
];

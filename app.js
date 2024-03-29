const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");
const adminRouter = require("./routes/admin");
const session = require("express-session");

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const app = express();

const main = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected to database!");
};

main().catch((err) => {
  console.log("database error", err);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

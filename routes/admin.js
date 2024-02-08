const router = require("express").Router();
const adminController = require("../controllers/adminController");
const categoryController = require("../controllers/categoryController");

router.use(categoryController.categories_list);

router.get("/login", adminController.login_get);
router.post("/login", adminController.login_post);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.getAllUsers);

router.post("/signup", userController.createUser);
router.post("/login", userController.userLogin);
router.delete("/remove_user/:id", userController.handleDeleteUsers);
router.put("/update_user/:id", userController.handleEditUsers);

module.exports = router;

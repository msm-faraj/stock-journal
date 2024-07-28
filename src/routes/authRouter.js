const express = require("express");
const router = express.Router();
const UserTable = require("../models").User;
const AuthController = require("../controllers/authController");
const authController = new AuthController(UserTable);

router.post(
  "/register",
  reqHandler(authController.register.bind(authController))
);

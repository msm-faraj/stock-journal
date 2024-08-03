const express = require("express");
const router = express.Router();
const reqHandler = require("../middlewares/req-handler");
const reqValidator = require("../middlewares/req-vlaidator");
const AuthController = require("../controllers/authController");
const authSchema = require("../controllers/authSchema");

module.exports = (User) => {
  const authController = new AuthController(User);
  const router = express.Router();

  router.post(
    "/register",
    reqValidator(authSchema, "body"),
    reqHandler(authController.register.bind(authController))
  );

  return router;
};

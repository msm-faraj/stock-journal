const express = require("express");
const router = express.Router();
const reqHandler = require("../middlewares/req-handler");
const AuthController = require("../controllers/authController");

module.exports = (User) => {
  const authController = new AuthController(User);
  const router = express.Router();

  router.post(
    "/register",
    reqHandler(authController.register.bind(authController))
  );

  return router;
};

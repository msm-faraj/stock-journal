const bcrypt = require("bcrypt");
const config = require("../config");
const httpStatus = require("http-status");

class AuthController {
  constructor({ User }, { authBcrypt = bcrypt }) {
    this.User = User;
    this.bcrypt = authBcrypt;
  }

  async register(req, res) {
    let { username, password, email } = req.body;
    let user = await this.User.findOne({
      where: { email },
    });
    if (user)
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "A user already registered with this email." });
    const salt = await this.bcrypt.genSalt(config.authentication.salt);
    const hashedPassword = await this.bcrypt.hash(password, salt);

    user = await this.User.create({
      username,
      password: hashedPassword,
      email,
    });
    return res.status(httpStatus.OK).send(user);
  }
}

module.exports = AuthController;

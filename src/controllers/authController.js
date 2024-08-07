const x = require("bcrypt");
const httpStatus = require("http-status");

class AuthController {
  constructor({ User }, { bcrypt = x }) {
    this.User = User;
    this.bcrypt = bcrypt;
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
    const salt = await this.bcrypt.genSalt(10);
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

const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
class AuthController {
  constructor(Users) {
    this.User = Users;
  }

  async register(req, res) {
    let { username, password, email } = req.body;
    let user = await this.User.findOne({
      where: { email },
    });
    if (user)
      return res
        .status(httpStatus.CONFLICT)
        .send("A user already registered with this email.");
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await this.User.create({
      username,
      password,
      email,
    });
    await user.save();
    return res.status(httpStatus.OK).send(user);
  }
}

module.exports = AuthController;

const bcrypt = require("bcrypt");
class AuthController {
  constructor(Users) {
    this.User = Users;
  }

  async register(req, res) {
    let { username, password, email } = req.body;
    // console.log(User);
    let user = await this.User.findOne({
      where: { email },
    });
    if (user)
      return res.status(409).send("A user already registered with this email.");
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await this.User.create({
      username,
      password,
      email,
    });
    await user.save();
    return res.status(200).send(user);
  }
}

module.exports = AuthController;

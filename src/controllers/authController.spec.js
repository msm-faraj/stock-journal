const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
const AuthController = require("./authController");

describe("AuthController", () => {
  let mockUserModel;
  let authController;

  beforeEach(() => {
    mockUserModel = {
      findOne: jest.fn(),
      create: jest.fn(),
    };
    authController = new AuthController(mockUserModel);
  });

  describe("register", () => {
    it("should return conflict status if user already exists", async () => {
      // Arrange
      const req = {
        body: {
          username: "testuser",
          password: "password123",
          email: "test@example.com",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockUserModel.findOne.mockResolvedValue({ email: "test@example.com" });

      // Act
      await authController.register(req, res);

      // Assert
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        where: { email: req.body.email },
      });
      expect(res.status).toHaveBeenCalledWith(httpStatus.CONFLICT);
      expect(res.json).toHaveBeenCalledWith({
        message: "A user already registered with this email.",
      });
    });

    it("should create a new user if user does not exist", async () => {
      // Arrange
      const req = {
        body: {
          username: "newuser",
          password: "password123",
          email: "new@example.com",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      mockUserModel.findOne.mockResolvedValue(null);
      const hashedPassword = "hashedpassword123";
      jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");
      jest.spyOn(bcrypt, "hash").mockResolvedValue(hashedPassword);
      const newUser = {
        username: "newuser",
        password: hashedPassword,
        email: "new@example.com",
      };
      mockUserModel.create.mockResolvedValue(newUser);

      // Act
      await authController.register(req, res);

      // Assert
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        where: { email: req.body.email },
      });
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, "salt");
      expect(mockUserModel.create).toHaveBeenCalledWith(newUser);
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(newUser);
    });
  });
});

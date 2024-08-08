const AuthController = require("./authController");

describe("AuthController", () => {
  let mockUserModel;
  let authController;
  let mockReq;
  let mockRes;
  let mockBcrypt;
  let mockSalt;
  let mockHashedPass;
  let mockHttpStatusOk;
  let mockHttpStatusConflict;

  describe("register", () => {
    describe("When everything is successful", () => {
      beforeEach(async () => {
        mockReq = {
          body: {
            username: "testuser",
            password: "testpass123",
            email: "test@example.com",
          },
        };

        mockRes = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
          json: jest.fn(),
        };

        mockUserModel = {
          findOne: jest.fn().mockResolvedValueOnce(null),
          create: jest.fn().mockResolvedValueOnce(mockReq.body),
        };

        mockBcrypt = {
          genSalt: jest.fn().mockResolvedValueOnce(mockSalt),
          hash: jest.fn().mockResolvedValueOnce(mockHashedPass),
        };

        mockSalt = 10;
        mockHashedPass = "HashedPass";
        mockHttpStatusOk = 200;

        authController = new AuthController(
          { User: mockUserModel },
          { authBcrypt: mockBcrypt }
        );

        await authController.register(mockReq, mockRes);
      });

      it("creates a correct instance of AuthController", () => {
        expect(authController).toBeInstanceOf(AuthController);
      });

      it("calls User.findOne with correct parameters", () => {
        expect(mockUserModel.findOne).toHaveBeenCalledWith({
          where: { email: mockReq.body.email },
        });
      });

      it("calls bcrypt.genSalt with correct params", () => {
        expect(mockBcrypt.genSalt).toHaveBeenCalledWith(10);
      });

      it("calls bcrypt.hash with correct params", () => {
        expect(mockBcrypt.hash).toHaveBeenCalledWith(
          mockReq.body.password,
          mockSalt
        );
      });

      it("calls User.create with correct params", () => {
        expect(mockUserModel.create).toHaveBeenCalledWith({
          username: "testuser",
          password: mockHashedPass,
          email: "test@example.com",
        });
      });

      it("calls res.status with correct params", () => {
        expect(mockRes.status).toHaveBeenCalledWith(mockHttpStatusOk);
      });

      it("calls res.status().send with correct params", () => {
        expect(mockRes.status().send).toHaveBeenCalledWith(mockReq.body);
      });
    });

    describe("When email is already registered", () => {
      beforeEach(async () => {
        mockReq = {
          body: {
            email: "registered@example.com",
          },
        };
        mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
        mockHttpStatusConflict = 409;

        mockUserModel = {
          findOne: jest.fn().mockResolvedValueOnce({}),
        };

        authController = new AuthController(
          { User: mockUserModel },
          { authBcrypt: mockBcrypt }
        );

        await authController.register(mockReq, mockRes);
      });

      it("calls User.findOne with correct parameters", () => {
        expect(mockUserModel.findOne).toHaveBeenCalledWith({
          where: { email: mockReq.body.email },
        });
      });

      it("calls res.status with correct params", () => {
        expect(mockRes.status).toHaveBeenCalledWith(mockHttpStatusConflict);
      });

      it("calls res.status().json with correct params", () => {
        expect(mockRes.status().json).toHaveBeenCalledWith({
          message: "A user already registered with this email.",
        });
      });
    });
  });
});

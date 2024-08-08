const AuthController = require("./authController");

describe("AuthController", () => {
  let mockReq;
  let mockRes;
  let mockSalt;
  let mockBcrypt;
  let mockUserModel;
  let authController;
  let mockHashedPass;
  let mockHttpStatusOk;
  let mockCatchedError;
  let mockHttpStatusConflict;

  beforeEach(() => {
    mockSalt = 10;
    mockHashedPass = "HashedPass";
    mockHttpStatusOk = 200;
    mockHttpStatusConflict = 409;
    mockHttpStatusBadRequest = 400;
    mockHttpStatusInternalError = 500;

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
      findOne: jest.fn(),
      create: jest.fn(),
    };

    mockBcrypt = {
      genSalt: jest.fn(),
      hash: jest.fn(),
    };

    authController = new AuthController(
      { User: mockUserModel },
      { authBcrypt: mockBcrypt }
    );
  });

  describe("register", () => {
    describe("When everything is successful", () => {
      beforeEach(async () => {
        mockUserModel.findOne.mockResolvedValueOnce(null);
        mockUserModel.create.mockResolvedValueOnce(mockReq.body);

        mockBcrypt.genSalt.mockResolvedValueOnce(mockSalt);
        mockBcrypt.hash.mockResolvedValueOnce(mockHashedPass);

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

        mockUserModel.findOne.mockResolvedValueOnce({});

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

    describe("When there is thrown error", () => {
      beforeEach(async () => {
        try {
          await authController.register(mockReq, mockRes);
        } catch (error) {
          mockCatchedError = error.message;
        }
      });

      it("throws an error when bcrypt.genSalt fails", async () => {
        mockBcrypt.genSalt.mockRejectedValueOnce(new Error("genSalt error"));
        await expect(authController.register(mockReq, mockRes)).rejects.toThrow(
          "genSalt error"
        );
      });

      it("throws an error when bcrypt.hash fails", async () => {
        mockBcrypt.hash.mockRejectedValueOnce(new Error("hash error"));
        await expect(authController.register(mockReq, mockRes)).rejects.toThrow(
          "hash error"
        );
      });

      it("throws an error when User.create fails", async () => {
        mockUserModel.create.mockRejectedValueOnce(new Error("create error"));
        await expect(authController.register(mockReq, mockRes)).rejects.toThrow(
          "create error"
        );
      });
    });
  });
});

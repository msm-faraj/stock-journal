const httpStatus = require("http-status");
const AuthController = require("./authController");

describe("AuthController", () => {
  let mockUserModel;
  let authController;
  let mockReq;
  let mockRes;
  let mockBcrypt;
  let mockSalt;
  let mockHashedPass;
  let mockHttpStatus;

  describe("register", () => {
    describe("when everything is successful", () => {
      beforeEach(async () => {
        mockReq = {
          body: {
            username: "testuser",
            password: "testpass123",
            email: "test@example.com",
          },
        };

        mockRes = {
          status: jest.fn().mockReturnValueOnce({ send: jest.fn() }),
          json: jest.fn(),
        };

        mockUserModel = {
          findOne: jest.fn().mockResolvedValueOnce(null),
          create: jest.fn().mockResolvedValueOnce(mockReq.body),
        };

        mockSalt = 10;
        mockHashedPass = "HashedPass";
        mockHttpStatus = 200;

        mockBcrypt = {
          genSalt: jest.fn().mockResolvedValueOnce(mockSalt), //????
          hash: jest.fn().mockResolvedValueOnce(mockHashedPass),
        };

        authController = new AuthController(
          { User: mockUserModel },
          { bcrypt: mockBcrypt }
        );

        const result = await authController.register(mockReq, mockRes);
      });

      it("create a correct instnace of AuthController", () => {
        expect(authController).toBeInstanceOf(AuthController);
      });

      it("calls User.fineOne with correct parameters", () => {
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
        expect(mockRes.status).toHaveBeenCalledWith(mockHttpStatus);
      });

      it("calls res.status().send with correct params", () => {
        expect(mockRes.status().send).toHaveBeenCalled();
      });
    });
  });
});

const AuthController = require("./authController");

describe("AuthController", () => {
  let mockUsers = jest.fn();
  let authController = new AuthController(mockUsers);

  it("should create an instance of with new", () => {
    expect(authController).toBeInstanceOf(AuthController);
  });

  it("should create an instance with mockUsers", () => {
    expect(authController.User).toBe(mockUsers);
  });
});

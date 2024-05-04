const authMiddleware = require("./auth");
const Users = require("../models/users");
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler");

jest.mock("../models/users");
jest.mock("jsonwebtoken");
jest.mock("express-async-handler");

describe("Authentication Middleware", () =>{
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer validtoken",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("authMiddleware", () => {
    it("should verify and set user in request if token is valid", async () => {
        jwt.verify.mockReturnValueOnce({useremail : "madhuwantha@gmail.com"});
        Users.findOne.mockReturnValueOnce({useremail : "madhuwantha@gmail.com"})

    //   await authMiddleware(req, res, next);

    //   expect(jwt.verify).toHaveBeenCalledWith("validtoken", process.env.ACCESS_TOKEN_SECRET);
    //   expect(Users.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    //   expect(req.user).toEqual({ email: "test@example.com" });
    //   expect(next).toHaveBeenCalled();
    });

    it("should handle empty token", async () => {
      req.headers.authorization = "";
      
    //   await authMiddleware(req, res, next);

    //   expect(res.status).toHaveBeenCalledWith(400);
    //   expect(res.send).toHaveBeenCalledWith({ status: "Token is empty" });
    //   expect(next).not.toHaveBeenCalled();
    });

    it("should handle invalid token", async () => {
      jwt.verify.mockImplementationOnce(() => {
        throw new Error("Invalid token");
      });
      
    //   await authMiddleware(req, res, next);

    //   expect(res.status).toHaveBeenCalledWith(400);
    //   expect(res.send).toHaveBeenCalledWith({ status: "Invalid token" });
    //   expect(next).not.toHaveBeenCalled();
    });

    it("should handle missing token", async () => {
      req.headers.authorization = null;
      
    //   await authMiddleware(req, res, next);

    //   expect(res.status).toHaveBeenCalledWith(400);
    //   expect(res.send).toHaveBeenCalledWith({ status: "There is no token attached to header" });
    //   expect(next).not.toHaveBeenCalled();
    });
  });

  describe("isAdmin", () => {
    it("should pass if user is admin", async () => {
      req.user = { userType: "Admin" };

    //   await isAdmin(req, res, next);

    //   expect(next).toHaveBeenCalled();
    });

    it("should reject if user is not admin", async () => {
      req.user = { userType: "Student" };

    //   await isAdmin(req, res, next);

    //   expect(res.status).toHaveBeenCalledWith(405);
    //   expect(res.send).toHaveBeenCalledWith({ status: "You are not an admin" });
    //   expect(next).not.toHaveBeenCalled();
    });
  });

  describe("isFaculty", () => {
    it("should pass if user is faculty", async () => {
      req.user = { userType: "Faculty" };

    //   await isFaculty(req, res, next);

    //   expect(next).toHaveBeenCalled();
    });

    it("should reject if user is not faculty", async () => {
      req.user = { userType: "Student" };

    //   await isFaculty(req, res, next);

    //   expect(res.status).toHaveBeenCalledWith(405);
    //   expect(res.send).toHaveBeenCalledWith({ status: "You are not a Faculty member" });
    //   expect(next).not.toHaveBeenCalled();
    });
  });

  describe("isStudent", () => {
    it("should pass if user is student", async () => {
      req.user = { userType: "Student" };

    //   await isStudent(req, res, next);

    //   expect(next).toHaveBeenCalled();
    });

    it("should reject if user is not student", async () => {
      req.user = { userType: "Faculty" };

    //   await isStudent(req, res, next);

    //   expect(res.status).toHaveBeenCalledWith(405);
    //   expect(res.send).toHaveBeenCalledWith({ status: "You are not a student" });
    //   expect(next).not.toHaveBeenCalled();
    });
  });
});

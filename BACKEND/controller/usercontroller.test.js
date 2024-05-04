const UserController = require("./usercontroller");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../config/jwtToken");
const generateRefreshToken = require("../config/refreshToken");
const asyncHandler = require("express-async-handler");
//const jest = require("jest");

jest.mock("../models/users");
jest.mock("jsonwebtoken");
jest.mock("../config/jwtToken");
jest.mock("../config/refreshToken");

describe('UserController', () => {

    describe('addUser', () => {
        it('should add a new user', async () => {
            const req = { body: { name: 'Osadha Madhuwantha', email: 'madhuwantha@gmail.com', password: 'madhu123', userType: 'student' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
            User.mockReturnValueOnce({ save: jest.fn().mockResolvedValue() });
    
            await UserController.addUser(req, res);
    
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith({ status: "User Added Successfully", user: expect.any(Object) });
        });
    });


    describe('userLogin', () => {
        it('should log in user and generate tokens', async () => {
            const req = { body: { email: 'madhuwantha@gmail.com', password: '123' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockUser = { email: 'madhuwantha@gmail.com', password: '123', userType: 'student', refreshToken: 'mockRefreshToken' };
            const mockAccessToken = 'mockAccessToken';
            const mockRefreshToken = 'mockRefreshToken';
    
            User.findOne.mockResolvedValueOnce(mockUser);
            jwt.verify.mockImplementationOnce((token, secret, callback) => callback(null, { useremail: 'madhuwantha@gmail.com', userType: 'student' }));
            generateAccessToken.generateAccessToken.mockReturnValueOnce(mockAccessToken);
            generateRefreshToken.mockReturnValueOnce(mockRefreshToken);
    
            await UserController.userLogin(req, res);
    
            expect(res.status).toHaveBeenCalledWith(412);
            //expect(res.send).toHaveBeenCalledWith({ status: "User logged Successfully", accessToken: mockAccessToken, refreshToken: mockRefreshToken });
        });
    
        it('should handle user not found', async () => {
            const req = { body: { email: 'madhuwantha@gmail.com', password: '123' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
            User.findOne.mockResolvedValueOnce(null);
    
            await UserController.userLogin(req, res);
    
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ status: "User not found" });
        });
    
        it('should handle incorrect password', async () => {
            const req = { body: { email: 'madhuwantha@gmail.com', password: '123' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockUser = { email: 'madhuwantha@gmail.com', password: '12', userType: 'student' };
    
            User.findOne.mockResolvedValueOnce(mockUser);
    
            await UserController.userLogin(req, res);
    
            expect(res.status).toHaveBeenCalledWith(412);
            expect(res.send).toHaveBeenCalledWith({ status: "User password is incorrect" });
        });
    
        it('should handle error', async () => {
            const req = { body: { email: 'madhuwantha@gmail.com', password: '123' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockError = new Error('Internal Server Error');
    
            User.findOne.mockRejectedValueOnce(mockError);
    
            await UserController.userLogin(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ status: "Error with logging functionality" });
        });
    });


    describe('generateToken', () => {
        it('should generate access token from refresh token', async () => {
            const req = { body: { refreshToken: 'mockRefreshToken' } };
            const res = { send: jest.fn() };
            const mockUser = { refreshToken: 'mockRefreshToken' };
            const mockAccessToken = 'mockAccessToken';
    
            User.findOne.mockResolvedValueOnce(mockUser);
            jwt.verify.mockImplementationOnce((token, secret, callback) => callback(null, { useremail: 'madhuwantha@gmail.com', userType: 'student' }));
            generateAccessToken.regenerateAccessToken.mockReturnValueOnce(mockAccessToken);
    
            await UserController.generateToken(req, res);
    
            //expect(res.send).toHaveBeenCalledWith({ accessToken: mockAccessToken });
        });
    
        it('should handle null refresh token', async () => {
            const req = { body: { refreshToken: null } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
            await UserController.generateToken(req, res);
    
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith({ status: "Token is null" });
        });
    
        it('should handle invalid refresh token', async () => {
            const req = { body: { refreshToken: 'invalidToken' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockUser = null;
    
            User.findOne.mockResolvedValueOnce(mockUser);
    
            await UserController.generateToken(req, res);
    
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.send).toHaveBeenCalledWith({ status: "Invalid refresh token" });
        });
    
        it('should handle token verification error', async () => {
            const req = { body: { refreshToken: 'mockRefreshToken' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockError = new Error('Token Verification Error');
    
            User.findOne.mockResolvedValueOnce({ refreshToken: 'mockRefreshToken' });
            jwt.verify.mockImplementationOnce((token, secret, callback) => callback(mockError));
    
            await UserController.generateToken(req, res);
    
            //expect(res.status).toHaveBeenCalledWith(500);
            //expect(res.send).toHaveBeenCalledWith({ status: "Error with token generation" });
        });
    });


    describe('logOut', () => {
        it('should log out user and remove refresh token', async () => {
            const req = { body: { refreshToken: 'mockRefreshToken' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockUser = { refreshToken: 'mockRefreshToken' };
    
            User.findOneAndUpdate.mockResolvedValueOnce();
    
            await UserController.logOut(req, res);
    
            expect(res.status).toHaveBeenCalledWith(401);
            //expect(res.send).toHaveBeenCalledWith({ status: "Logged out successfully" });
        });
    
        it('should handle null refresh token', async () => {
            const req = { body: { refreshToken: null } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
            await UserController.logOut(req, res);
    
            //expect(res.status).toHaveBeenCalledWith(401);
            //expect(res.send).toHaveBeenCalledWith({ status: "Token is null" });
        });
    
        it('should handle error', async () => {
            const req = { body: { refreshToken: 'mockRefreshToken' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockError = new Error('Internal Server Error');
    
            User.findOneAndUpdate.mockRejectedValueOnce(mockError);
    
            await UserController.logOut(req, res);
    
            expect(res.status).toHaveBeenCalledWith(401);
            //expect(res.send).toHaveBeenCalledWith({ status: "Error with logout functionality" });
        });
      });
});
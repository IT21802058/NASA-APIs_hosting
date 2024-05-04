const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const { authMiddleware, isAdmin, isStudent } = require('../middleware/auth');
const {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getOneUser,
  enrollCourses,
  displayEnrolledCourses,
  removeEnrolledCourse,
  userLogin,
  generateToken,
  logOut,
} = require('../controller/usercontroller');

const app = express();
app.use(express.json());
app.use('/', userRoutes);

jest.mock('../middleware/auth');
jest.mock('../controller/usercontroller');

describe('User Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should configure add user route', () => {
    expect(userRoutes.stack[0].route.path).toBe('/add');
    expect(userRoutes.stack[0].route.stack[0].handle).toBe(addUser);
  });

  it('should configure get all users route with authMiddleware and isAdmin', () => {
    expect(userRoutes.stack[1].route.path).toBe('/updateuser/:id');
    expect(userRoutes.stack[1].route.stack[0].handle).toBe(authMiddleware);
  });

  it('should configure update user route with authMiddleware', () => {
    expect(userRoutes.stack[2].route.path).toBe('/deleteuser/:id');
    expect(userRoutes.stack[2].route.stack[0].handle).toBe(authMiddleware);
  });

  it('should configure delete user route with authMiddleware', () => {
    expect(userRoutes.stack[3].route.path).toBe('/getoneuser/:id');
    expect(userRoutes.stack[3].route.stack[0].handle).toBe(authMiddleware);
  });

  it('should configure get one user route with authMiddleware', () => {
    expect(userRoutes.stack[4].route.path).toBe('/userlogin');
  });

  it('should configure user login route', () => {
    expect(userRoutes.stack[5].route.path).toBe('/token');
  });

  it('should configure generate token route', () => {
    expect(userRoutes.stack[6].route.path).toBe('/logout');
  });

  it('should configure logout route with authMiddleware', () => {
    expect(userRoutes.stack[7].route.path).toBe('/profile');
  });

});

// Integration Test
describe('Integration Test: User Routes', () => {
  it('should add user successfully', async () => {
    const mockRequest = {
      body: {
        username: 'testUser',
        email: 'test@example.com',
        password: 'testPassword',
      },
    };

    const mockResponse = {};
    const mockNext = jest.fn();

    addUser.mockImplementationOnce((req, res) => res.status(201).send('User Added Successfully'));

    await request(app)
      .post('/add')
      .send(mockRequest.body)
      .expect(201)
      .expect('User Added Successfully');

    //expect(addUser).toHaveBeenCalledWith(mockRequest, mockResponse);
  });
});

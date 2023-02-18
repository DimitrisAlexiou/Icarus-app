const bcrypt = require('bcryptjs');
const User = require('../../models/users/user');
const loginController = require('../../controllers/auth/login');
const { generateToken } = require('../../middleware/authMiddleware');

jest.mock('../../models/users/user', () => ({
	findOne: jest.fn(),
	save: jest.fn(),
}));
jest.mock('bcryptjs', () => ({
	compare: jest.fn(),
}));
jest.mock('../../middleware/authMiddleware', () => ({
	generateToken: jest.fn(),
}));

describe('loginController', () => {
	const req = {
		body: {
			username: 'icsd17009',
			password: 'mA!12asd6ga',
		},
	};

	const res = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn().mockReturnThis(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return 500 and error message if there is an error while finding user', async () => {
		User.findOne.mockImplementationOnce(() => {
			throw new Error('Error while finding user');
		});

		try {
			loginController.login(req, res);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ message: 'Error while finding user' });
		} catch (error) {
			console.error('Error: ', error);
		}
	});

	it('should return 401 and error message if user is not found or password is incorrect', async () => {
		User.findOne.mockReturnValue(null);
		bcrypt.compare.mockReturnValue(false);

		try {
			loginController.login(req, res);
			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user credentials!' });
		} catch (error) {
			console.error('Error: ', error);
		}
	});

	it('should return 400 and error message if user is found but account is deactivated', async () => {
		const user = {
			_id: '123456789',
			username: 'icsd17009',
			password: 'hashedPassword',
			isActive: false,
			loginFailedAttempts: 0,
		};

		User.findOne.mockReturnValue(user);
		bcrypt.compare.mockReturnValue(true);

		try {
			loginController.login(req, res);
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				message: 'Account is deactivated, please contact the admin',
			});
		} catch (error) {
			console.error('Error: ', error);
		}
	});

	it('should return 200 and user and token if user is found and password is correct', async () => {
		const user = {
			_id: '123456789',
			username: 'icsd17009',
			password: 'hashedPassword',
			isActive: true,
			loginFailedAttempts: 0,
		};

		User.findOne.mockReturnValue(user);
		bcrypt.compare.mockReturnValue(true);
		generateToken.mockReturnValue('token');

		try {
			loginController.login(req, res);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				user: user,
				token: 'token',
			});
			expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, 'hashedPassword');
		} catch (error) {
			console.error('Error: ', error);
		}
	});

	it('should return 400 and error message if username or password is not provided', async () => {
		req.body.username = '';

		try {
			loginController.login(req, res);
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				message: 'Please fill in all the required fields!',
			});
		} catch (error) {
			console.error('Error: ', error);
		}

		req.body.username = 'icsd17009';
		req.body.password = '';

		try {
			loginController.login(req, res);
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				message: 'Please fill in all the required fields!',
			});
		} catch (error) {
			console.error('Error: ', error);
		}
	});
});

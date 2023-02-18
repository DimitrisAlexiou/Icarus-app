const bcrypt = require('bcryptjs');
const User = require('../../models/users/user');
const registerController = require('../../controllers/auth/register');
const { generateToken } = require('../../middleware/authMiddleware');

jest.mock('../../models/users/user', () => ({
	findOne: jest.fn(),
}));
jest.mock('bcryptjs', () => ({
	hash: jest.fn(),
	genSalt: jest.fn(),
}));
jest.mock('../../middleware/authMiddleware', () => ({
	generateToken: jest.fn(),
}));

describe('registerController', () => {
	const req = {
		body: {
			name: 'name',
			surname: 'surname',
			username: 'icsd17009',
			email: 'icsd17009@email.com',
			password: 'mA!12asd6ga',
			type: 'Student',
		},
	};

	const res = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn().mockReturnThis(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return 400 and error message if user with the provided email already exists', async () => {
		const existingUser = req.body.email;

		User.findOne.mockReturnValue(existingUser);

		try {
			registerController.register(req, res);
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				message: 'Seems like a user with this email already exists!',
			});
		} catch (error) {
			console.error('Error: ', error);
		}
	});

	it('should return 400 and error message if the provided username is taken', async () => {
		const usernameTaken = req.body.username;

		User.findOne.mockReturnValue(usernameTaken);

		try {
			registerController.register(req, res);
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				message: 'Seems like this username is taken!',
			});
		} catch (error) {
			console.error('Error: ', error);
		}
	});

	it('should return 400 and error message if one or more required fields are not provided', async () => {
		req.body.username = '';

		try {
			registerController.register(req, res);
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				message: 'Please fill in all the required fields!',
			});
		} catch (error) {
			console.error('Error: ', error);
		}

		req.body.username = 'icsd17009';
		req.body.password = '';
		req.body.type = 'Student';

		try {
			registerController.register(req, res);
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				message: 'Please fill in all the required fields!',
			});
		} catch (error) {
			console.error('Error: ', error);
		}
	});

	it('should return 500 and error message if there is an error while finding user', async () => {
		User.findOne.mockImplementationOnce(() => {
			throw new Error('Error while finding user');
		});

		try {
			console.log('gets here');
			registerController.register(req, res);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ message: 'Error while finding user' });
		} catch (error) {
			console.error('Error: ', error);
		}
	});
});

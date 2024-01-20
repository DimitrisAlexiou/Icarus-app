import { Request } from 'express';
import { UserProps } from '../models/users/user';

export interface AuthenticatedRequest extends Request {
	user?: UserProps;
}

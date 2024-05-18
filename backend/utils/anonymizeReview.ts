import crypto from 'crypto';

const iv = crypto.randomBytes(16);
const encryptionKey = process.env.ENCRYPTION_KEY.substring(0, 32);

export const encryptUserId = (userId: string): string => {
	const cipher = crypto.createCipheriv(
		process.env.ALGORITHM,
		Buffer.from(encryptionKey),
		iv
	);
	let encrypted = cipher.update(userId, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
};

export const decryptHashedUserId = (hashedUserId: string): string => {
	const decipher = crypto.createDecipheriv(
		process.env.ALGORITHM,
		Buffer.from(encryptionKey),
		iv
	);
	let decrypted = decipher.update(hashedUserId, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
};

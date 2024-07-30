import bcrypt from 'bcryptjs';

// Function to hash a password
export const hash= (password: string): Promise<string> => {
    return bcrypt.hash(password, 10); // 10 rounds of salt
};

// Function to compare password with hashed password
export const compare = (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

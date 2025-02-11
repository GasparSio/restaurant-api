import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export interface User {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
}

/**
 * An array of Users objects representing different users.
 * Each restaurant object contains details such as id, email, username, password.
 * 
 * @type {User[]}
 * 
 * @property {string} id - The unique identifier for the user.
 * @property {string} email - The email of the user.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 */

export let users: User[] = [];

/**
 * Function to create a new user and add it to the users array with the hashed password.
 */
export const createUser = async (email: string, username: string, password: string, ) => {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
        id: uuidv4(),
        email,
        username,
        password: hashedPassword
    };

    // Add the new user to the users array
    users.push(newUser);
    return newUser;
};

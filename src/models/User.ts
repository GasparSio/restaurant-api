import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export interface User {
    id: string;
    username: string;
    password: string;
    favorites: string[];
}

/**
 * An array of Restaurant objects representing different restaurants.
 * Each restaurant object contains details such as id, name, address, cuisine, rating, image, description, and comments.
 * 
 * @type {User[]}
 * 
 * @property {string} id - The unique identifier for the user.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 * @property {string[]} favorites - An array of restaurant IDs that the user has favorited.
 */

export let users: User[] = [];

/**
 * Function to create a new user and add it to the users array with the hashed password.
 */
export const createUser = async (username: string, password: string, ) => {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
        id: uuidv4(),
        username,
        password: hashedPassword,
        favorites: []
    };

    // Add the new user to the users array
    users.push(newUser);
    return newUser;
};

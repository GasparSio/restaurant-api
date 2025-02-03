import bcrypt from 'bcryptjs';

export interface User {
    id: string;
    username: string;
    email: string;
    favorites: string[];
}

/**
 * An array of Restaurant objects representing different restaurants.
 * Each restaurant object contains details such as id, name, address, cuisine, rating, image, description, and comments.
 * 
 * @type {User[]}
 * 
 * @property {string} id - The unique identifier for the user.
 * @property {string} username - The name of the user.
 * @property {string} email - The email of the user.
 * @property {string[]} favorites - An array of restaurant IDs that the user has favorited.
 */

export let users: User[] = [];

/**
 * 
 */


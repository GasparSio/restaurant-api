import { User } from "./User";

export interface Restaurant {
    id: string;
    name: string;
    address: string;
    cuisine: string;
    rating: number;
    image: string;
    description: string;
    comments: Comment[];
}

export interface Comment {
    id: string;
    user: User;
    text: string;
    date: string;
}

/**
 * An array of Restaurant objects representing different restaurants.
 * Each restaurant object contains details such as id, name, address, cuisine, rating, image, description, and comments.
 * 
 * @type {Restaurant[]}
 * 
 * @property {string} id - The unique identifier for the restaurant.
 * @property {string} name - The name of the restaurant.
 * @property {string} address - The address of the restaurant.
 * @property {string} cuisine - The type of cuisine the restaurant offers.
 * @property {number} rating - The rating of the restaurant out of 5.
 * @property {string} image - The URL of the restaurant's image.
 * @property {string} description - A brief description of the restaurant.
 * @property {string[]} comments - An array of comments about the restaurant.
 */
export let restaurants: Restaurant[] = [
    {
        id: "1",
        name: "Italian Pasta Place",
        address: "Calle de Núñez de Balboa, 112-116, Salamanca, 28006 Madrid",
        cuisine: "Italian",
        rating: 4.5,
        image: "",
        description: "Delicious pasta and wine.",
        comments: [],
    },
    {
        id: "2",
        name: "Sushi Kyu",
        address: "Calle de Diego de León, 44, Salamanca, 28006 Madrid",
        cuisine: "Japanese",
        rating: 4.2,
        image: "",
        description: "Fresh sushi and Pokebowl.",
        comments: [],
      },
      {
        id: "3",
        name: "Argentinian Grill",
        address: "Calle de Maldonado, 13, Salamanca, 28006 Madrid",
        cuisine: "Argentine",
        rating: 5.0,
        image: "",
        description: "Best meet from Argentina.",
        comments: [],
      },
      {
        id: "4",
        name: "Mexican Tacos",
        address: "Calle de Diego de León, 23-19, Salamanca, 28006 Madrid",
        cuisine: "Mexican",
        rating: 3.6,
        image: "",
        description: "Mexican Tacos and Margaritas.",
        comments: [],
      }
]
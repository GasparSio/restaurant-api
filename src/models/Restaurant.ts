import { User } from "./User";

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
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
 * @property {string} lat - The latitude of the restaurant.
 * @property {string} lng - The longitud of the restaurant.
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
    lat: 40.4363713,
    lng: -3.6842974,
    cuisine: "Italian",
    rating: 4,
    image: "../images/1.jpg",
    description: "A cozy Italian restaurant offering a variety of fresh homemade pasta, wood-fired pizzas, and an extensive selection of fine wines. Perfect for romantic dinners and family gatherings.",
    comments: [
      { id: "c1", user: { username: "John Doe" }, text: "Amazing pasta! The carbonara was perfect." },
      { id: "c2", user: { username: "Jane Smith" }, text: "Lovely atmosphere and great wine selection." },
      { id: "c3", user: { username: "Emily Johnson" }, text: "The tiramisu was delicious! Highly recommend." },
      { id: "c4", user: { username: "Michael Brown" }, text: "Authentic Italian experience, will come back." }
    ],
  },
  {
    id: "2",
    name: "Sushi Kyu",
    address: "Calle de Diego de León, 44, Salamanca, 28006 Madrid",
    lat: 40.4345052,
    lng: -3.6826271,
    cuisine: "Japanese",
    rating: 5,
    image: "../images/2.jpg",
    description: "An elegant Japanese restaurant specializing in fresh sushi, sashimi, and authentic Japanese dishes. A must-visit for sushi lovers looking for high-quality ingredients and artistic presentation.",
    comments: [
      { id: "c5", user: { username: "Chris Wilson" }, text: "Best sushi in town! Super fresh fish." },
      { id: "c6", user: { username: "Anna Lee" }, text: "Loved the omakase experience." },
      { id: "c7", user: { username: "Mark Adams" }, text: "Excellent service and beautiful plating." },
      { id: "c8", user: { username: "Lisa White" }, text: "The Pokebowl was so tasty and fresh!" }
    ],
  },
  {
    id: "3",
    name: "Argentinian Grill",
    address: "Calle de Maldonado, 13, Salamanca, 28006 Madrid",
    lat: 40.4339898,
    lng: -3.6866688,
    cuisine: "Argentine",
    rating: 3.0,
    image: "../images/3.jpg",
    description: "A traditional Argentine grill house serving premium cuts of beef, cooked to perfection on an open-flame grill. A paradise for meat lovers seeking an authentic asado experience.",
    comments: [
      { id: "c9", user: { username: "David Clark" }, text: "The steak was juicy and perfectly grilled!" },
      { id: "c10", user: { username: "Emma Harris" }, text: "Authentic Argentine flavors, great chimichurri." },
      { id: "c11", user: { username: "Jack Robinson" }, text: "Decent meal but service was a bit slow." },
      { id: "c12", user: { username: "Sophia Martinez" }, text: "Loved the empanadas and Malbec wine." }
    ],
  },
  {
    id: "4",
    name: "Mexican Tacos",
    address: "Calle de Diego de León, 23-19, Salamanca, 28006 Madrid",
    lat: 40.4351899,
    lng: -3.6848461,
    cuisine: "Mexican",
    rating: 4,
    image: "../images/4.jpg",
    description: "A lively Mexican eatery offering a variety of authentic tacos, burritos, and traditional Mexican dishes, paired with refreshing margaritas and a vibrant atmosphere.",
    comments: [
      { id: "c13", user: { username: "James Baker" }, text: "The tacos al pastor were phenomenal!" },
      { id: "c14", user: { username: "Olivia Carter" }, text: "Great margaritas and friendly service." },
      { id: "c15", user: { username: "Henry Evans" }, text: "Authentic flavors, felt like being in Mexico!" },
      { id: "c16", user: { username: "Charlotte Lewis" }, text: "A bit crowded, but the food was worth it." }
    ],
  },
  {
    id: "5",
    name: "Asian Food",
    address: "C. del Gral. Oráa, 45-43, Salamanca, 28006 Madrid",
    lat: 40.4360658,
    lng: -3.683059,
    cuisine: "Asian",
    rating: 3,
    image: "../images/5.jpg",
    description: "A fusion of Asian flavors featuring dishes from Chinese, Thai, and Vietnamese cuisines. A great spot for those looking to explore a variety of authentic Asian street food.",
    comments: [
      { id: "c17", user: { username: "Daniel Scott" }, text: "The pad thai was incredible!" },
      { id: "c18", user: { username: "Mia Turner" }, text: "Nice selection of dim sum." },
      { id: "c19", user: { username: "Ethan Nelson" }, text: "Could use more spice, but still good." },
      { id: "c20", user: { username: "Isabella Roberts" }, text: "Loved the variety of Asian dishes!" }
    ],
  }
];
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Restaurant, restaurants} from '../models/Restaurant';

const router = Router();

/**
 * @route   GET /api/restaurants
 * @description  Get all restaurants
 */
router.get('/', (req, res) => {
    res.json(restaurants);
})

/**
 * @route GET /api/restaurants/:id
 * @description Get a restaurant by id
 */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    //Filter the restaurant by id
    const restaurant = restaurants.find((restaurant) => restaurant.id === id);

    if (restaurant) {
        res.json(restaurant);
    } else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
})

/**
 * @route POST /api/restaurants
 * @description Create a new restaurant
 */
router.post('/', (req, res) => {
    //Recieve the data from the request body
    const {
        name, address, cuisine, rating, image, description
    } = req.body;

    //Validate the data
    const newRestaurant: Restaurant = {
        id: uuidv4(),
        name,
        address,
        cuisine,
        rating,
        image,
        description,
        comments: [],
    }

    //Add the new restaurant to the array
    restaurants.push(newRestaurant);
    res.status(201).json(newRestaurant);
})

/**
 * @route PUT /api/restaurants/:id
 * @description Update a restaurant by its id
 */
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const {
        name, address, cuisine, rating, image, description
    } = req.body;

    //Search the restaurant by id
    const restaurant = restaurants.find((restaurant) => restaurant.id === id);

    //If the restaurant exists, update the data
    if (restaurant) {
        restaurant.name = name || restaurant.name;
        restaurant.address = address || restaurant.address;
        restaurant.cuisine = cuisine || restaurant.cuisine;
        restaurant.rating = rating || restaurant.rating;
        restaurant.image = image || restaurant.image;
        restaurant.description = description || restaurant.description;

        res.json({ message: 'Restaurant updated', restaurant });
    } else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
})

/**
 * @route DELETE /api/restaurants/:id
 * @description Delete a restaurant by its id
 */
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    //Search the restaurant by id
    const index = restaurants.findIndex((restaurant) => restaurant.id === id);
    if (index !== -1) {
        //If the restaurant exists, delete it
        restaurants.splice(index, 1);
        res.json({ message: 'Restaurant deleted' });
    } else {
        res.status(404).json({ message: 'Restaurant not found' });
    }
})

export default router;
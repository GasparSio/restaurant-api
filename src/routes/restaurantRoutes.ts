import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Restaurant, restaurants} from '../models/Restaurant';
import { authMiddleware } from '../middlewares/authMiddleware';

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
    try {
        const id = req.params.id;
        //Filter the restaurant by id
        const restaurant = restaurants.find((restaurant) => restaurant.id === id);
    
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        console.error("Error on finding a restaurant by Id", error);
        res.status(400).json({ message: 'Invalid ID' });
    }
})

/**
 * @route POST /api/restaurants
 * @description Create a new restaurant if the user is authenticated
 */
router.post('/', authMiddleware, (req, res) => {
    try {
        //Recieve the data from the request body
        const {
            name, address, lat, lng, cuisine, rating, image, description
        } = req.body;
    
        //Validate the data
        const newRestaurant: Restaurant = {
            id: uuidv4(),
            name,
            address,
            lat,
            lng,
            cuisine,
            rating,
            image,
            description,
            comments: [],
        }
    
        //Add the new restaurant to the array
        restaurants.push(newRestaurant);
        res.status(201).json(newRestaurant);    
    } catch (error) {
        console.error("Error on creating a new restaurant", error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

/**
 * @route PUT /api/restaurants/:id
 * @description Update a restaurant by its id if the user is authenticated
 */
router.put('/:id', authMiddleware, (req, res) => {
    try {
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
    } catch (error) {
        console.error("Error on updating a restaurant", error);
        res.status(500).json({ message: 'Internal server error' });      
    }
})

/**
 * @route DELETE /api/restaurants/:id
 * @description Delete a restaurant by its id if the user is authenticated
 */
router.delete('/:id', authMiddleware, (req, res) => {
    try {
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
    } catch (error) {
        console.error("Error on deleting a restaurant", error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;
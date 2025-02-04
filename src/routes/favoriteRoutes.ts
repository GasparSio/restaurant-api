import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { users } from "../models/User";
import { restaurants } from "../models/Restaurant";

const router = Router();

/**
 * @route GET /api/favorites
 * @description Get the list of favorite restaurants for the authenticated user
 */
router.get('/', authMiddleware, (req, res) => {
    try {
        // Get the authenticated user from the request
        const user = req.body.user;

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        //Get the list of favorite restaurant IDs for the user
        const favorites = user.favorites || [];
        console.log('favorites al traernos el listado en el get', favorites);
        //Get the list of favorite restaurants for the user
        const favoriteRestaurants = restaurants.filter((restaurant) => favorites.includes(restaurant.id));
        console.log('favoriteRestaurants en el GET', favoriteRestaurants);
        res.json(favoriteRestaurants);
    } catch (error) {
        console.error("Error getting favorite restaurants", error);
        res.status(400).json({ message: 'Error getting favorite restaurants' });
    }
})

/**
 * @route POST /:rId
 * @description Add a restaurant to the list of favorite restaurants for the authenticated user
 */
router.post('/:rId', authMiddleware, (req, res) => {
    try {
        const { rId } = req.params;
        const user = req.body.user;
        const restaurantExists = restaurants.some((restaurant) => restaurant.id === rId);

        //Check if the user exists
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        //Check if the restaurant exists
        if (!restaurantExists) {
            res.status(404).json({ message: 'Restaurant not found' });
            return;
        }

        const favorites = user.favorites || [];
        
        //Check if the restaurant is already in the user's favorites
        if (favorites.includes(rId)) {
            res.status(400).json({ message: 'Restaurant already in favorites' });
            return;
        }

        //Add the restaurant to the user's favorites
        favorites.push(rId);
        console.log('favorites al pushear', favorites);
        res.json({ message: "Restaurante agregado a favoritos", favorites });
    } catch (error) {
        console.error("Error adding restaurant to favorites", error);
        res.status(400).json({ message: 'Error adding restaurant to favorites' });        
    }
})

/**
 * @route DELETE /:rId
 * @description Remove a restaurant from the list of favorite restaurants for the authenticated user
 */
router.delete('/rId', authMiddleware, (req, res) => {
    try {
        const { rId } = req.params;
        const user = req.body.user;

        //Check if the user exists
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const favorites = user.favorites || [];
        
        //Delete the restaurant from the user's favorites
        user.favorites = user.favorites.filter((id: string) => id !== rId);
        res.json({ message: "Restaurante eliminado de favoritos", favorites });
    } catch (error) {
        console.error("Error deleting restaurant from favorites", error);
        res.status(400).json({ message: 'Error deleting restaurant from favorites' });
    }
})
export default router;
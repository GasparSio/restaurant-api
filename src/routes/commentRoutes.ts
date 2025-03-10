import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { restaurants } from '../models/Restaurant';
import { authMiddleware } from '../middlewares/authMiddleware';


const router = Router();

/**
 * @route POST /api/comments/:rId
 * @description Add a comment to a restaurant
 */
router.post('/:rId', (req, res) => {
    const { rId } = req.params;
    const { id, text } = req.body;
    const user = req.body.user;

    try {
        //Find the restaurant by id
        const restaurant = restaurants.find((restaurant) => restaurant.id === rId);
        
        if (!restaurant) {
            res.status(404).json({ message: 'Restaurant not found' });
            return;
        }

        //Create a new comment
        const newComment = {
            id,
            user,
            text,
            date: new Date().toISOString(),
        }

        //Add the comment to the restaurant
        restaurant.comments.push(newComment);
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error adding a comment to a restaurant", error);
        res.status(400).json({ message: 'Error adding a comment' });
    }
})

/**
 * @route PUT /api/comments/:rId/edit/:cId
 * @description Update a comment of a restaurant by id only if the user is the author
 */
router.put('/:rId/edit/:cId', (req, res) => {
    const { rId, cId } = req.params;
    const { text, rating } = req.body;
    const user = req.body.user;

    try {
        //Find the restaurant by id
        const restaurant = restaurants.find((restaurant) => restaurant.id === rId);
        
        if (!restaurant) {
            res.status(404).json({ message: 'Restaurant not found' });
            return;
        }

        //Find the comment by id
        const comment = restaurant.comments.find((comment) => comment.id === cId);

        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }

        //Check if the user is the author of the comment
        if (comment.user.id !== user.id) {
            res.status(403).json({ message: 'You are not authorized to update this comment' });
            return;
        }

        comment.text = text || comment.text;
        comment.rating = rating || comment.rating;
        res.json({ message: 'Comment updated', comment });
    } catch (error) {
        console.error("Error updating a comment of a restaurant", error);
        res.status(400).json({ message: 'Error updating a comment' });      
    }
})

/**
 * @route DELETE /api/comments/:rId/delete/:cId
 * @description Delete a comment of a restaurant by id only if the user is the author
 */
router.delete('/:rId/delete/:cId', (req, res) => {
    const { rId, cId } = req.params;
    const { user } = req.body;

    try {
        //Find the restaurant by id
        const restaurant = restaurants.find((restaurant) => restaurant.id === rId);
        if (!restaurant) {
            res.status(404).json({ message: 'Restaurant not found' });
            return;
        }

        //Find the comment by id
        const commentIndex = restaurant?.comments.findIndex((comment) => comment.id === cId);
        if (commentIndex === -1) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }

        //Delete the comment
        restaurant.comments.splice(commentIndex, 1);
        res.json({ message: "Comment deleted" });
    } catch (error) {
        console.error("Error deleting a comment of a restaurant", error);
        res.status(400).json({ message: 'Error deleting a comment' });       
    }
})

export default router;
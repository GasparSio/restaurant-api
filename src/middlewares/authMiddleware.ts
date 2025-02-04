import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secret123';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // Get token from header
    const token = req.header('Authorization');

    // Check if there is no token, return 401
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // Attaches the decoded user to req.body.user and allows access.
        req.body.user = decoded;

        // Call next middleware or controller
        return next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
}
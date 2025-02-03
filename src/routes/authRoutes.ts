import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, users, createUser } from '../models/User';

const router = Router();

const SECRET_KEY = process.env.JWT_SECRET || 'secret123';

/**
 * @route POST /api/auth/register
 * @description Register a new user
 */
router.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
    
        if (!username || !password) {
          return res.status(400).json({ message: "Username and password are required" });
        }
    
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
          return res.status(400).json({ message: "The user already exists" });
        }
    
        const newUser = await createUser(username, password);
    
        return res.status(201).json({ 
          message: "User resgitered successfully", 
          user: { id: newUser.id, username: newUser.username } 
        });
    
      } catch (error) {
        console.error("Error on saving user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
});

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión y obtener token JWT
 */
router.post("/login", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = users.find((u) => u.username === username);
      
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ message: "Credenciales inválidas" });
        }
      
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ token });
    } catch (error) {
        console.error("Error on login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
  
export default router;
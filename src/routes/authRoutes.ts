import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { users, createUser } from '../models/User';

const router = Router();

const SECRET_KEY = process.env.JWT_SECRET || 'secret123';

/**
 * @route POST /api/auth/register
 * @description Register a new user
 */
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
    
        if (!email || !username || !password) {
          res.status(400).json({ message: "Email and password are required" });
          return;
        }
    
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
          res.status(400).json({ message: "The user already exists" });
          return;
        }
    
        const newUser = await createUser(email, username, password);
    
        res.status(201).json({ 
          message: "User resgitered successfully", 
          user: { id: newUser.id, email: newUser.email } 
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
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        const user = users.find((u) => u.email === email);

        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        if (!user.password) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY, { expiresIn: "2h" });
        
        res.json({ token });
    } catch (error) {
        console.error("Error on login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
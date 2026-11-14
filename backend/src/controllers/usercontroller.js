
import User from '../models/user.js';
import bcrypt from 'bcrypt';

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for missing details
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already registered'
            });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in MongoDB
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

// Login an existing user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Compare entered password with stored hash
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Save user ID in session
        req.session.userId = user._id.toString();

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

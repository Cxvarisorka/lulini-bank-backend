import express from "express";
import User from "../models/user.model.js";
const router = express.Router();


router.post('/signup', async (req, res) => {
    const { username, email, password, fullname, country, transactions, bankNumber } = req.body;


    console.log(username, email, password, fullname, country, transactions, bankNumber)

    // Validate the input
    if (!username || !email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);


        // Create a new user
        const newUser = new User({ username, email, password, fullname, country, transactions, bankNumber });
        await newUser.save();

        // Send a success response
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error });
    }
})

router.get('/user', (req, res) => {
    res.status(200).send("Yeeeeee")
})

export default router;
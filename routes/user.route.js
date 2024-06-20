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

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).send({ message: 'User does not exist' });
        }

        if (existingUser.password === password) {
            return res.status(200).send({ message: 'Successfully logged in!', account: {...existingUser} });
        }

        // If the password does not match
        return res.status(400).send({ message: 'Invalid credentials' });
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error', err });
    }
});

router.put('/changepassword', async (req, res) => {
    const {newPassword, email, currentPassword, confirmPassword} = req.body;

    try{
        const user = await User.findOne({ email });

        if(user.password !== currentPassword){
            res.status(400).send({ message: "Current password is incorrect!" });
        }

        if(newPassword !== confirmPassword){
            res.status(400).send({ message: "New password dont match reapet password!" });
        }

        user.password = newPassword;

        await user.save();

        return res.status(200).send({ message: "Password changed succesfully", account: {...user} });

    } catch (err) {
        return res.status(500).send({ message: 'Internal server error', err });
    }
});

router.put('/loan', async (req, res) => {
    const {password, loan, account} = req.body;

    const email = account.email;
    
    try{
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).send({ message: 'Account not found!' });
        }

        if(user.password !== password){
            return res.status(400).send({ message: 'Password is incorrect!' });
        }

        user.transactions.push(loan);
        
        await user.save();

        return res.status(200).send({ message: "Loan is succsesfully!", account: {...user} })

    } catch(error) {
        res.status(500).send({ message: 'Internal server error', error });
    }
})


router.get('/user', (req, res) => {
    res.status(200).send("Yeeeeee")
})

export default router;
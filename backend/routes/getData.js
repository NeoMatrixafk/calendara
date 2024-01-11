const express = require('express');
const router = express.Router();
const { User } = require('../models/user'); // Import your User model or use your database schema directly


router.get('/', async (req, res) => {
    try {

        const user = await User.findOne({ name: req.body.name });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ data: { name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;

const router = require("express").Router();
const { User, validate } = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const successMessage = "User created successfully";

    try {
        const contact = await User.findOne({ contact: req.body.contact });
        const email = await User.findOne({ email: req.body.email });
        console.log(req.body.password);

        const { error } = validate(req.body);

        if (contact) {
            return res.status(408).send({ message: "Contact already exists!" });
        } else if (email) {
            return res.status(409).send({ message: "Email already exists!" });
        } else if (error) {
            console.error("Password validation error:", error);
            return res.status(400).send({ message: error.details[0].message });
        } else {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            await new User({ ...req.body, password: hashPassword }).save();
            res.status(201).json({ message: successMessage });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;

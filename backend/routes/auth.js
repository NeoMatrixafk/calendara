const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

//posting account details from client to server
router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(401)
                .send({ status: 401, message: "Invalid Email!" });

        //hashing password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res
                .status(402)
                .send({ status: 402, message: "Invalid Password!" });

        //creating jwt token
        const token = user.generateAuthToken();
        res.status(200).send({
            status: 200,
            data: token,
            message: "Logged in successfully",
        });
    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
});

module.exports = router;

const { default: mongoose } = require("mongoose");
const { userCollection } = require("../db/database");

const router = require("express").Router();


//Get user specific data
router.get("/user", async (req, res) => {
    try {
        const email = req.query.email;
        const filter = { email: email };
        const result = await userCollection.findOne(filter);
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
    }
});


//Post user
router.post("/user", async (req, res) => {
    try {
        const data = req.body;

        const isExist = await userCollection.findOne({ email: data.email });

        if (!isExist) {
            const newUser = userCollection(data);
            const result = await newUser.save();
            res.status(201).send(result);
        }

        res.send("User already exist");
    }
    catch (error) {
        console.log(error);
    }
});


//Update user
router.put("/user", async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body;
        const result = await userCollection.findByIdAndUpdate(new mongoose.Types.ObjectId(id), data);
        res.send(result);

    }
    catch (error) {
        console.log(error);
    }
})



module.exports = router;
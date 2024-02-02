require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require("./db/database");
const port = process.env.PORT || 9000;


//Middlewares
app.use(express.json());
app.use(cors());


//Routes
app.use(userRoutes);



//Listen server and database connection
const run = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`The server is running at http://localhost:${port}`)
    })
}

run();
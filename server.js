require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoute");

// creating server
const app = express();

// using middleware to parse request body in json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware routes
app.use('/', userRoutes);

// running the server
app.listen(process.env.PORT, ()=> {
    console.log(`Server listening on the port ${process.env.PORT}`);
});

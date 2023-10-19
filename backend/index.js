const { mongoose } = require("mongoose");
const express = require("express");
const app = express();
const vendorRoute = require("./routes/vendorRoutes");
const orderRoute = require("./routes/orderRoutes");
const parent_productRoute = require("./routes/parent_productRoutes")
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//database connection
async function connect() {
    try {
        await mongoose.connect(process.env.CONN_STR);
        console.log("Connected to mongoDB");

    } catch (error) {
        console.error(error);

    }
}
connect();

app.use("/vendors", vendorRoute);
app.use("/orders", orderRoute);
app.use("/parent_products", parent_productRoute);

//creating api point on localhost:8000
app.listen(8000, () => {
    console.log("Server started on port 8000")
});

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const fs = require('fs');
const { VendorModel, transformVendorData } = require('./../models/vendor');
const { parentProductModel, transformParentProductData } = require('./../models/parent_product');
const { orderModel, transformOrderData } = require("./../models/order")

// database connection to import .json files
mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((connection) => {
    console.log('DB Connection Succesful');
}).catch((error) => {
    console.log('Some error has occurred!');
})

const vendors = JSON.parse(fs.readFileSync('./data/vendors.json', 'utf-8'));
const parentProducts = JSON.parse(fs.readFileSync('./data/parent_products.json', 'utf-8'));
const orders = JSON.parse(fs.readFileSync('./data/orders.json', 'utf-8'));


const transformedVendorData = transformVendorData(vendors);
const transformedParentProductData = transformParentProductData(parentProducts);
const transformedOrderData = transformOrderData(orders);

const clearData = async () => {
    try {
        await VendorModel.deleteMany();
        await parentProductModel.deleteMany();
        await orderModel.deleteMany();
        console.log('Data cleared!');
    } catch (error) {
        console.log(error.message);
    }
    process.exit();
}

const importData = async () => {
    try {
        await VendorModel.create(transformedVendorData);
        await parentProductModel.create(transformedParentProductData);
        await orderModel.create(transformedOrderData);
        console.log('Data imported!');
    } catch (error) {
        console.log(error.message);
    }
    process.exit();
}

// node data/import-data.js --import , to import .json files to database tables
if (process.argv[2] === '--import') {
    importData();
}
// node data/import-data.js --delete , to clear database tables
if (process.argv[2] === '--delete') {
    clearData();
}
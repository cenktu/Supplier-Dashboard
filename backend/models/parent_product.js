const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// parentProduct model for database table
const parentProductSchema = new mongoose.Schema({
    _id: {

        type: ObjectId,
        required: true,
        unique: true,

    },
    name: {
        type: String,

    },
    vendor: {

        type: ObjectId,
        ref:'vendor',

    }

})

// function to transform parent_product.json data to database
function transformParentProductData(data) {
    return data.map((item) => ({
        _id:  item._id?.$oid , 
        name: item.name,
        vendor:  item.vendor?.$oid ,
    }));
}

const parentProductModel = mongoose.model('parent_products', parentProductSchema);

module.exports = { parentProductModel, transformParentProductData };
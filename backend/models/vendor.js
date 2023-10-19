const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// vendor model for database table
const vendorSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
        unique: true,

    },
    name: {
        type: String,
        required: true,
    }
})

// function to transform vendor.json data to database
function transformVendorData(data) {
    return data.map((item) => ({
        _id: { _id: item._id?.$oid }, 
        name: item.name,
    }));
}

const VendorModel = mongoose.model('vendor', vendorSchema);

module.exports = { VendorModel, transformVendorData };
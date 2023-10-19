const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// order model for database table
const orderSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
        unique: true,
    },
    cart_item: [{
        product: {
            type: ObjectId,
            ref:'parent_product'
        },
        variantId: {
            type: ObjectId,
        },
        series: {
            type: String,
        },
        item_count: {
            type: Number,
        },
        quantity: {
            type: Number,
        },
        cogs: {
            type: Number,
        },
        price: {
            type: Number,
        },
        vendor_margin: {
            type: Number,
        },
        order_status: {
            type: String,
        },
        _id: {
            type: ObjectId,
        },
    }],
    payment_at: {
        type: Date,
    },

})

// function to transform order.json data to database
function transformOrderData(data) {
    return data.map((item) => ({
        _id: item._id?.$oid , 
        cart_item: item.cart_item.map((cartItem) => ({
            product: cartItem.product?.$oid ,
            variantId: cartItem.variantId?.$oid ,
            series: cartItem.series,
            item_count: cartItem.item_count,
            quantity: cartItem.quantity,
            cogs: cartItem.cogs,
            price: cartItem.price,
            vendor_margin: cartItem.vendor_margin,
            order_status: cartItem.order_status,
            _id: cartItem._id?.$oid ,
        })),
        payment_at: new Date(parseInt(item.payment_at?.$date?.$numberLong)),
    }));
}

const orderModel = mongoose.model('orders', orderSchema);

module.exports = { orderModel, transformOrderData };
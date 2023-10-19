const { orderModel } = require('./../models/order');
const { parentProductModel } = require('./../models/parent_product');

// optional, to create a new order
exports.add = async (req, res) => {
    try {
        const order = await orderModel.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                order
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

// optional, to get all orders in the order table
exports.getAllOrders = async (req, res) => {
    try {
        const order = await orderModel.find();

        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        })

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

// optional, to get a specific order with id parameter
exports.getSingleOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

// calculating total sales of a vendor with the id parameter
exports.getProductSalesByVendor = async (req, res) => {
    try {
        const vendorId = req.params.id;

        // listing product ids associated with the vendor
        const products = await parentProductModel.find({ vendor: vendorId });
        const productIds = products.map((product) => product._id);

        // list orders with product IDs and populate with product name
        const orders = await orderModel
            .find({ 'cart_item.product': { $in: productIds } })
            .populate({
                path: 'cart_item.product',
                model: 'parent_products',
                select: 'name',
            });

        // create an array to store total sold and product details for each product
        const salesData = [];
        products.forEach((product) => {
            const productSales = {
                _id: product._id,
                productName: product.name,
                totalSold: 0,
            };
            salesData.push(productSales);
        });

        // calculate total sold for each product
        orders.forEach((order) => {
            order.cart_item.forEach((cartItem) => {
                const product = cartItem.product;

                // to calculate total amount, multiply item_count and quantity for each product
                const totalSold = cartItem.item_count * cartItem.quantity;
                const productId = product ? product._id.toString() : null;

                // to get rid of nulls inside salesData
                if (productId) {
                    const productSales = salesData.find((sales) => sales._id.toString() === productId);
                    if (productSales) {
                        productSales.totalSold += totalSold;
                    }
                }
            });
        });

        // filter products with totalSold equal to 0
        const soldProducts = salesData.filter((product) => product.totalSold > 0);

        res.status(200).json({
            status: 'success',
            data: {
                salesData: soldProducts,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
}

// calculating 6-month sales of a vendor with the id parameter
exports.getMonthlySalesByVendor = async (req, res) => {
    try {
        const vendorId = req.params.id;

        // calculate the start and end date for the last 6 months (data is not up to date so last data recorded in 2023-03)
        const now = new Date();
        const startDate = new Date(now.getFullYear()-1, now.getMonth() , 1);
        const endDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);

        // find product ids associated with the vendor
        const products = await parentProductModel.find({ vendor: vendorId });
        const productIds = products.map((product) => product._id);

        // list orders with product IDs and within the last month and populate with product name
        const orders = await orderModel
            .find({
                'cart_item.product': { $in: productIds },
                payment_at: { $gte: startDate, $lte: endDate },
            })
            .populate({
                path: 'cart_item.product',
                model: 'parent_products',
                select: 'name',
            });

        // create an array to store total sold and paymentDate information for each product
        const salesData = [];
        products.forEach((product) => {
            const productSales = {
                _id: product._id,
                productName: product.name,
                totalSold: 0,
                paymentDate: [],
            };
            salesData.push(productSales);
        });

        // calculate total sold for each product
        orders.forEach((order) => {
            order.cart_item.forEach((cartItem) => {
                const product = cartItem.product;
                const totalSold = cartItem.item_count * cartItem.quantity;
                const productId = product ? product._id.toString() : null;
                const paymentDate = order.payment_at;

                if (productId) {
                    const productSales = salesData.find((sales) => sales._id.toString() === productId);
                    if (productSales) {
                        // extract the month and year from the paymentDate
                        const date = new Date(paymentDate);
                        const monthKey = date.toLocaleString('default', { month: 'long' });
                        const yearKey = date.getFullYear();

                        // check if there is an entry for the year otherwise create one
                        if (!productSales.paymentDate[yearKey]) {
                            productSales.paymentDate[yearKey] = {};
                        }
                        // check if there is an entry for the month of that year, if not make it 0
                        if (!productSales.paymentDate[yearKey][monthKey]) {
                            productSales.paymentDate[yearKey][monthKey] = 0;
                        }
                        // add up to totalSold
                        productSales.paymentDate[yearKey][monthKey] += totalSold;
                        productSales.totalSold += totalSold;
                    }
                }
            });
        });

        // filter products with totalSold equal to 0
        const soldProducts = salesData.filter((product) => product.totalSold > 0);
        soldProducts.forEach((product) => {
            // filter paymentDates with 0
            product.paymentDate = product.paymentDate.filter(Boolean);
        });

        res.status(200).json({
            status: 'success',
            data: {
                salesData: soldProducts,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

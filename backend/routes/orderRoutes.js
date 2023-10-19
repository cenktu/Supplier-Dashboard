const orderController = require('./../controllers/orderController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(orderController.getAllOrders)
    .post(orderController.add)


router.route('/:id')
    .get(orderController.getSingleOrder)

// route for total sales of a vendor
router.route('/products/:id')
    .get(orderController.getProductSalesByVendor)
// route for monthly sales of a vendor
router.route('/products/monthly/:id')
    .get(orderController.getMonthlySalesByVendor)

/*router.route('/products/monthly/try/:id')
    .get(orderController.getMonthlySalesByVendors)*/

module.exports = router;
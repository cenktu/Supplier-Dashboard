const vendorController = require('./../controllers/vendorController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(vendorController.getAllVendors)
    .post(vendorController.add)


router.route('/:id')
    .get(vendorController.getSingleVendor)
/*.patch(vendorController.updateVendor)
.delete(vendorController.deleteVendor) */

module.exports = router;
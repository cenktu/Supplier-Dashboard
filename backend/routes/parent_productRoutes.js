const parentProductController = require('./../controllers/parentProductController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(parentProductController.getAllParentProducts)
    .post(parentProductController.add)


router.route('/:id')
    .get(parentProductController.getSingleParentProduct)


module.exports = router;
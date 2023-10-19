const { parentProductModel } = require('./../models/parent_product');

// optional, if we want to create a new parent product
exports.add = async (req, res) => {
    try {
        const parentProduct = await parentProductModel.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                parentProduct
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }


}
// optional, to get all parent products in the parent_product table
exports.getAllParentProducts = async (req, res) => {
    try {
        const parentProduct = await parentProductModel.find();

        res.status(200).json({
            status: 'success',
            data: {
                parentProduct
            }
        })

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

// optional, to get a specific parent_product with id parameter
exports.getSingleParentProduct = async (req, res) => {
    try {
        const parentProduct = await parentProductModel.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                parentProduct
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

const { VendorModel } = require('./../models/vendor');


// optional, if we want to create a new vendor
exports.add = async (req, res) => {
    try {
        const vendor = await VendorModel.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                vendor
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

// optional, to get all vendors in the vendor table
exports.getAllVendors = async (req, res) => {
    try {
        const vendor = await VendorModel.find();

        res.status(200).json({
            status: 'success',
            data: {
                vendor
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

// optional, to get a specific vendor with id parameter
exports.getSingleVendor = async (req, res) => {
    try {
        const vendor = await VendorModel.findById(req.params.id);
        if(!vendor){
            return res.status(404).json({
                status:'fail',
                message:'Vendor not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                vendor
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}


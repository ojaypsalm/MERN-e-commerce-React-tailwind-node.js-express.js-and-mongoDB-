const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async (req, res)=>{
    try {
        const {category} = req?.body || req.query

        const product = await productModel.find({category: category})
        res.status(200).json({
            message: "Product",
            data: product,
            success: true,
            error: false

        })

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })

    }
}

module.exports = getCategoryWiseProduct
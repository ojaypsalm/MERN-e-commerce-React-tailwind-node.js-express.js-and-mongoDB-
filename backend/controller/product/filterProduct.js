const productModel = require("../../models/productModel")

const filterProductController = async(req, res)=>{
    try {
        const categoryList = req?.body?.categoryList || []
        
        const product = await productModel.find({
           category : {
            "$in" : categoryList
           }
        })

        res.json({
            data: product,
            message: 'Product',
            success: true,
            error: false
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports = filterProductController
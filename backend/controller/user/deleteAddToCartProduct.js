const productCartModel = require("../../models/productCart")

const deleteAddToCartProduct = async(req, res)=>{
    try {
        const currentUserId = req.userId
        const addToCartProductId = req.body._id
        const deleteProduct = await productCartModel.deleteOne({
            _id: addToCartProductId,
        })

        res.json({
            message: 'Product deleted successfully',
            success: true,
            error: false,
            data: deleteProduct
        })

    } catch (error) {
        res.json({
            success: false,
            message: error?.message || error,
            error: false
        })
    }
}

module.exports = deleteAddToCartProduct
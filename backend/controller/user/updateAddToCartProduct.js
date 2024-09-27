const productCartModel = require("../../models/productCart");

const updateAddToCartProduct = async(req, res)=>{
    try{
        const currentUserId = req.userId;
        const addCartProductId = req.body._id;
        const qty = req.body.quantity;

        const updateProduct = await productCartModel.updateOne(
            {
                _id: addCartProductId,
                userId: currentUserId
            },
            {
                quantity: qty
            }
        )

        res.json({
            message : 'Product updated successfully',
            success: true,
            error: false,
            data: updateProduct

        })


    }catch(error){
        res.json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = updateAddToCartProduct
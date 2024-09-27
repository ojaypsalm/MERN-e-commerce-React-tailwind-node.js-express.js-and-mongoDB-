const productCartModel = require("../../models/productCart");

const addToCartViewProduct = async(req, res)=>{
     try {
        const  currentUser = req.userId;
        const allProduct = await productCartModel.find({
            userId : currentUser
        }).populate('productId')
        res.json({
            success : true,
            message : "Product added to cart",
            data : allProduct,
            error : false
        })

     } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message || error,
            error: true

        })

     }
}

module.exports = addToCartViewProduct
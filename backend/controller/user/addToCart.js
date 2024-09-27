const productCartModel = require("../../models/productCart");

const addToCartController = async(req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.userId;

        const isProductAvailable = await productCartModel.find({productId})
        
        console.log('isProductAvailable', isProductAvailable)
        if(isProductAvailable.length > 0){
            return res.json({
                message: "Product already in cart",
                error: true,
                success: false
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }

        const newAddToCart = new productCartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            message: "Product added to cart successfully",
            error: false,
            success: true,
            data: saveProduct
        })


    } catch (error) {
        res.json({
            message: error?.message || "Something went wrong",
            error: true,
            success: false
        })   
    }
}

module.exports = addToCartController
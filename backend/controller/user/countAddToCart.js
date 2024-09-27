const productCartModel = require("../../models/productCart");

const countAddToCart = async(req, res)=>{
    try {
        const userId = req.userId;

        const count = await productCartModel.countDocuments({
            userId: userId
        });

        res.json({
            message: "Cart count",
            error: false,
            success: true,
            data: count
        })

    } catch (error) {
        res.json({
            message: error?.message || error,
            error: true,
            success: false
        })

    }
}

module.exports = countAddToCart;
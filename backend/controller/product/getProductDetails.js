const productModel = require("../../models/productModel");

const getProductDetail = async(req, res)=>{
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);

        res.json({
            message : "Single Product detail",
            error : false,
            success : true,
            data : product
          })
        
    } catch (error) {
        res.json(   
            {
                error: true,
                success: false,
                message: error.message || error
            })
    }
}

module.exports = getProductDetail;
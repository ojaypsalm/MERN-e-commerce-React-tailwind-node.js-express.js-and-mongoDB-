const productModel = require("../../models/productModel");

const searchProduct = async(req, res)=>{
    try {
        const query = req.query.q;
        if(!query){
            return res.status(400).json({
                message: "Search query is required",
                success: false,
                data:[],
                error: true
            });
        }
        const regex = new RegExp(query,'i')

        const product = await productModel.find({
            '$or' : [
                {
                    productName: regex
                },
                {
                    category: regex
                }
            ]
        });

        if(product.length === 0){
            return res.json({
                message: "No product found",
                success: true,
                data:[],
                error: false
            });
        }
        res.json({
            message : "Search Product List",
            success : true,
            data : product,
            error: false
        })
    } catch (error) {
        res.json({
            message: error.message || "An error occurred during the search",
            success : false,
            error : true
        })
    }
}

module.exports = searchProduct
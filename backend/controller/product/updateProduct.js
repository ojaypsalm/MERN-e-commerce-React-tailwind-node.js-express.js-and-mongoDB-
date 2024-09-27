const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function updateProductController(req, res){
    try {
        if(!uploadProductPermission(req.userId)){

            throw new error('Permission Denied!!')
        }
        const {_id, ...resBody} = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, {new : true})
        res.json({
            message : 'Product Updated Successfully',
            error : false,
            success : true,
            data : updateProduct
        })
    }catch(error){
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = updateProductController
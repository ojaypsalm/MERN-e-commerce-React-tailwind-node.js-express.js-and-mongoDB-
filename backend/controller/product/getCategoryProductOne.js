const productModel = require("../../models/productModel")

const getCategoryProduct = async(req, res)=>{
    try {
        const productCategory = await productModel.distinct('category')

        console.log('category', productCategory)

        //array to store one category from each category
        const productByCategory = []

        for(let i = 0; i < productCategory.length; i++){
            const product = await productModel.findOne({category : productCategory[i]})
            productByCategory.push(product);
        } 
        
        // for(const category of productCategory){
        //     const product = await productModel.findOne({category : category})

        //     if(product){
        //         productByCategory.push(product)

        //     }
        // }

        res.json({
            message : 'Product Category',
            error : false,
            success : true,
            data : productByCategory
        })



    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false

        })

    }
}
module.exports = getCategoryProduct
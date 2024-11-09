const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async(category)=>{
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
        method: SummaryApi.categoryWiseProduct.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            category: category
        })
    })
    //console.log('response', response)

    const dataResponse = await response.json()
    return dataResponse
    



}
module.exports = fetchCategoryWiseProduct
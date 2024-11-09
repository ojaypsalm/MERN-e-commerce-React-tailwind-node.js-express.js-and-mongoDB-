const backendDomain = "http://localhost:8080";
const backendSignIn = "http://localhost:8080";
const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendSignIn}/api/signIn`,
        method : "post"
    },
    current_user : {
        url : `${backendDomain}/api/user_details`,
        method : 'get'
    },
    logout_user :{
        url :`${backendDomain}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomain}/api/all-user`,
        method : 'get'
    }, 
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : 'post'
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : 'post'
    },
    productCategory : {
        url : `${backendDomain}/api/get-category-product`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method : 'post'
    },
    productDetail : {
        url : `${backendDomain}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomain}/api/add-to-cart`,
        method : 'post'
    },
    productCount : {
        url : `${backendDomain}/api/count-cart-product`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomain}/api/view-cart-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomain}/api/product-filter`,
        method: 'post'
    }


}


export default SummaryApi
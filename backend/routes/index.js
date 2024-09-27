const express = require('express')
const router = express.Router()

const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignin')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetail = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCart')
const countAddToCart = require('../controller/user/countAddToCart')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')

router.post('/signup', userSignUpController) 
router.post('/signIn', userSignInController)
router.get('/user_details',authToken, userDetailsController)
router.get('/userLogout', userLogout)


//admin panel
router.get('/all-user',authToken, allUsers)
router.post('/update-user', authToken, updateUser )

//product
router.post('/upload-product', authToken, UploadProductController)
router.get('/get-product', getProductController)
router.post('/update-product', authToken, updateProductController)
router.get('/get-category-product', getCategoryProduct)
router.post('/category-product', getCategoryWiseProduct)
router.post('/product-details', getProductDetail)
router.get('/search', searchProduct)
router.post('/product-filter', filterProductController )

//add to cart

router.post('/add-to-cart', authToken, addToCartController)
router.get('/count-cart-product', authToken, countAddToCart)
router.get('/view-cart-product', authToken, addToCartViewProduct)
router.post('/update-cart-product', authToken, updateAddToCartProduct)
router.post('/delete-cart-product', authToken, deleteAddToCartProduct)






module.exports = router
const express =require('express')
const router= express.Router()
const userBasic=require('../Controllers/userBasicController')
const userProductDetails=require('../Controllers/userProductDisplay')
const sessionChecker=require('../middleware/sessionMiddleware')
const userCart=require('../Controllers/userCartController')
const wishList=require('../Controllers/userWishListController')
const proceedToCheckOut=require('../Controllers/userCheckOutController')
const placeOrder =require('../Controllers/userPlaceOrderController')
const categoryController= require('../Controllers/userCategoryController')
const userProfileController = require('../Controllers/userProfileController')
const couponController = require('../Controllers/userCouponController')
const userShop = require('../Controllers/userShopController')

// user router

router.get("/",userBasic.showLandingPage)
router.get('/showUserLoginPage',userBasic.showLoginPage)
router.get('/showUserSignUpPage',userBasic.showSignUpPage)
router.get('/userLogoutAction',userBasic.userLogout)
router.post('/signupAction',userBasic.userSignupAction)
router.post('/userNewLoginAction',userBasic.userLoginAction)
router.post("/otpVerification",userBasic.verifyOtp)


//userSideSingleProductDetails

router.get('/viewProductDetailsPage',sessionChecker.userSessionChecker,userProductDetails.showProductDetails)


//category


router.get('/categoryBased',categoryController.showCategoryPage)
//userCart

router.get('/userCart',sessionChecker.userSessionChecker,userCart.userCartPage)

router.get('/showAddtoCart',sessionChecker.userSessionChecker,userCart.userCartPage)

router.post('/add-to-cart/:id',sessionChecker.userSessionChecker,userCart.addToCart)
router.post('/changeProductQuantity',sessionChecker.userSessionChecker,userCart.cartChangeProductQuantity)
router.delete('/removeCartProduct',sessionChecker.userSessionChecker,userCart.removeCartOneProduct)

router.post("/cart/applyCoupon",sessionChecker.userSessionChecker,couponController.applyCoupon)


//shopper
router.get('/shop',sessionChecker.userSessionChecker,userShop.shopDisplay)



//user wishlist
router.get("/showWishListPage",sessionChecker.userSessionChecker,wishList.userWishListPage)
router.post('/addToWishList',sessionChecker.userSessionChecker,wishList.addToWishList)
router.delete('/removeWishListProduct',sessionChecker.userSessionChecker,wishList.removeWishListProduct)


//user checkout
router.get('/cart/proceedToCheckout',sessionChecker.userSessionChecker,proceedToCheckOut.showProceedToCheckOutPage)
router.get('/proceedToCheckout',sessionChecker.userSessionChecker,proceedToCheckOut.showCheckOutPage)


//user place order
router.post('/placeOrderDetails',sessionChecker.userSessionChecker,placeOrder.placeOrder)
router.get('/orderPlacedPage',sessionChecker.userSessionChecker,placeOrder.showOrderPlaced)
router.post('/verifyPayment',sessionChecker.userSessionChecker,placeOrder.verifyPayment)



router.get('/viewOrders',sessionChecker.userSessionChecker,userProfileController.viewOrders)

router.get('/viewOrderProducts',sessionChecker.userSessionChecker,userProfileController.viewOrderProducts)

// user profile

router.get('/userProfilePage',sessionChecker.userSessionChecker,userProfileController.showUserProfile)

router.get('/editProfile',sessionChecker.userSessionChecker,userProfileController.editProfile)

router.post('/editedUserProfile',sessionChecker.userSessionChecker,userProfileController.editProfileDetails)

router.get('/changePassword',sessionChecker.userSessionChecker,userProfileController.showPasswordChangePage)

router.post('/updatePassword',sessionChecker.userSessionChecker,userProfileController.updatePassword)


module.exports=router
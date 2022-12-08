
const productDisplay=require('../Model/userProductDisplayModel')
const cartModel= require('../Model/userCartModel')
const wishListModel = require('../Model/userWishLIstModel')

const showProductDetails = async(req,res)=>{
    let productId = req.query.id
    console.log(productId)
    wishListCount =null
    cartCount=null
    if (req.session.user) {
      cartCount = await cartModel.getCartCount(req.session.user._id);
      wishListCount = await wishListModel.getWishListCount(req.session.user._id) 

    }
    let product = await productDisplay.viewProductDetails(productId)
  
    res.render('user/productDetailsPage',{admin:false,user:false,product,cartCount,wishListCount})
  }
  
  module.exports = {
    showProductDetails
  }
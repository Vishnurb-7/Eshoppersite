
const cartModel = require('../Model/userCartModel')
const categoryModel =require('../Model/adminCategory')
const checkOutModel = require('../Model/userCheckOutModel')
const wishListModel = require('../Model/userWishLIstModel')
const checkOut =require("../Model/userCheckOutModel")

const showCheckOutPage = async (req, res) => {

    let products = await cartModel.getCartProducts(req.session.user._id)
    let cartCount = null;
    let wishListCount = null
    if (req.session.user) {
      cartCount = await cartModel.getCartCount(req.session.user._id);
      wishListCount = await wishListModel.getWishListCount(req.session.user._id) 

    }
    
    let finalTotal = Math.round(req.query.finalTotal)
    
    categoryModel.showCategory().then((category) => {
      let userData = req.session.user;
      res.render("user/checkOut", {
        admin: false,
        user: true,
        userData,
        cartCount,
        category,
        products,
        finalTotal,
        wishListCount
      });
    });
  };

  const showProceedToCheckOutPage = (req,res)=>{
    let finalTotal = req.query.FINALTOTAL
    console.log('this is final total',finalTotal);
    res.json(finalTotal)
    }




  module.exports={
    showCheckOutPage,
    showProceedToCheckOutPage
  }
  
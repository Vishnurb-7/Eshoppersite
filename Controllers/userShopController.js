const categoryProducts = require("../Model/userShopModel");
const brand = require("../Model/adminBrand");
const category = require("../Model/adminCategory");
const cartModel = require("../Model/userCartModel");
const checkOut = require('../Model/userCheckOutModel')
const wishListModel = require('../Model/userWishLIstModel')
const shopModel = require('../Model/userShopModel')


const viewShop = async (req, res) => { // this is category shop controller
    let categoryId = req.query.id;
    let product = await categoryProducts.viewProductDetails(categoryId);
    let cartCount = null 
    let wishListCount = null
    if(req.session.user){
      cartCount = await cartModel.getCartCount(req.session.user._id)
      wishListCount = await wishListModel.getWishListCount(req.session.user._id)
    }
  
    brand.showBrand().then((brand) => {
      category.showCategory().then((category) => {
        let userData = req.session.user
        res.render("user/userShoppingPage", {
          admin: false,user:true,
          product,
          brand,
          category,
          userData,cartCount,
          wishListCount
        });
      });
    });
  };


const shopDisplay = async(req,res)=>{ 
    let product = await shopModel.viewShopProducts()
    let cartCount = null 
    let wishListCount = null
    if(req.session.user){
      cartCount = await cartModel.getCartCount(req.session.user._id)
      wishListCount = await wishListModel.getWishListCount(req.session.user._id)
    }
  
    brand.showBrand().then((brand) => {
      category.showCategory().then((category) => {
        let userData = req.session.user
        res.render("user/mainShoppingPage", {
          admin: false,user:true,
          brand,
          category,
          userData,cartCount,
          wishListCount,
          product
        });
      });
    });
  }
  

  module.exports = {
    viewShop,
    shopDisplay
  };
  
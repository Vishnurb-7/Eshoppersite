
// const userDetails= require('../Model/userBasic')
// const nodemailer =require('nodemailer')
const userProductDisplay=require('../Model/userProductDisplayModel')
const categoryDisplay=require('../Model/adminCategory')
const banner =require('../Model/bannerModel')
const cartModel = require('../Model/userCartModel')
const wishListModel = require('../Model/userWishLIstModel')
const categoryModel= require('../Model/userCategoryModel')



const showCategoryPage =async(req,res)=>{
    let cartCount = null 
     let wishListCount = null
    let catName = req.query.catName
 
    
    if(req.session.user){
    
    categoryModel.showCategoryBasedProducts(catName).then(async(products)=>{
 

     cartCount= await cartModel.getCartCount(req.session.user._id)
  
     wishListCount= await wishListModel.getWishListCount(req.session.user._id)
        userProductDisplay.displayProduct().then((productDetails)=>{
        
            categoryDisplay.showCategory().then((category)=>{
            
                    let userData=req.session.user
                    res.render("user/category",{admin:false,user:true,productDetails,category,userData,wishListCount,cartCount,products})
                })
    
            })

    })
    
    }else{
        categoryModel.showCategoryBasedProducts(catName).then((products)=>{
            userProductDisplay.displayProduct().then((productDetails)=>{
                categoryDisplay.showCategory().then(async(category)=>{
           
                    cartCount= await cartModel.getCartCount(req.session.user._id)
                    wishListCount= await wishListModel.getWishListCount(req.session.user._id)
                    let userData=req.session.user
                    res.render("user/category",{admin:false,user:true,productDetails,category,userData,cartCount,wishListCount,products})

                })
            })
        })

    } 
   
}

module.exports={
    showCategoryPage
}
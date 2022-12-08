const { response } = require('express')
const userCategory = require('../Model/adminCategory')
const userCart=require('../Model/userCartModel')
const checkOut =require('../Model/userCheckOutModel')
const wishListModel=require('../Model/userWishLIstModel')
const cartModel=require('../Model/userCartModel')


const userCartPage = async (req,res)=>{
    let products = await userCart.getCartProducts(req.session.user._id)
    // console.log('hhhproductssss',products);
    let cartCount =null
    let wishListCount =null
    let total =0
   
    if(products.length>0){
        total = await checkOut.TotalAmount(req.session.user._id)
    }
    // console.log(total);
    let TOTAL = total[0]?total[0].total:0
    if(req.session.user){
        cartCount = await cartModel.getCartCount(req.session.user._id)
        wishListCount = await wishListModel.getWishListCount(req.session.user._id)
        
    }
    
   
    userCategory.showCategory().then(async(category)=>{
    let userData=req.session.user
    if(products.length<0){
        TOTAL=0
    }
    let userDetails = req.session.user._id
    
  
    //  console.log('total mk',total);
    res.render('user/cart',{user:true,admin:false,userData,userDetails,category,products,cartCount,TOTAL,wishListCount})
    })
}

const addToCart=(req,res)=>{
    
    let productid = req.body.productId

    userCart.addToCarts(productid,req.session.user._id).then(()=>{
        res.json({status:true})
    })
}

const cartChangeProductQuantity = (req,res,next)=>{
    
    
    cartModel.changeProductQuantity(req.body).then(async (response)=>{
    total = await checkOut.TotalAmount(req.session.user._id)
    response.total = total
    res.json(response)
        
    })
}

const removeCartOneProduct = (req,res)=>{
    cartModel.removeCartProduct(req.body).then((response)=>{
    res.json(response)
   })
  }

module.exports={
    userCartPage,
    addToCart,
    cartChangeProductQuantity,
    removeCartOneProduct
    
}
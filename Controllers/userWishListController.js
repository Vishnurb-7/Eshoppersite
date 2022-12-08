const category = require('../Model/adminCategory')
const cartModel = require('../Model/userCartModel')
const userProductDisplayModel = require('../Model/userProductDisplayModel')
const wishListModel = require('../Model/userWishLIstModel')



const userWishListPage= async (req,res)=>{
    let products = await wishListModel.getWishListProducts(req.session.user._id)
    let cartCount =null
    let wishListCount =null
    if(req.session.user)
    {
        wishListCount= await wishListModel.getWishListCount(req.session.user._id)
        cartCount= await cartModel.getCartCount(req.session.user._id)
    } 
    // userProductDisplay.displayProduct().then((productDetails)=>{
    category.showCategory().then((category)=>{
    userProductDisplayModel.displayProduct().then((productDetails)=>{


      let userData = req.session.user
        // console.log('hhhhhhhhhhhhhhhhhhhh',products);
        res.render('user/userWishListPage',{admin:false,user:true,category,userData,cartCount,wishListCount,products,productDetails})
    })
        
    })
}

const addToWishList = (req,res)=>{
  let productid = req.body.productId
  wishListModel.addToWishList(productid,req.session.user._id).then(()=>{
    res.json({status:true})
  })
  
}


const removeWishListProduct = (req,res)=>{
  
    // console.log('remove wishlist ==========>>>>>>>>>>>>>>      ',req.body);
   wishListModel.removeWishListProduct(req.body).then((response)=>{
    res.json(response)
   })
  }

  
module.exports={
    userWishListPage,
    addToWishList,
    removeWishListProduct


}
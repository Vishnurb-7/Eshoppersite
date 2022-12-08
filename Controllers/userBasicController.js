const { response } = require('express')
const userDetails= require('../Model/userBasic')
const nodemailer =require('nodemailer')
const userProductDisplay=require('../Model/userProductDisplayModel')
const categoryDisplay=require('../Model/adminCategory')
const banner =require('../Model/bannerModel')
const cartModel = require('../Model/userCartModel')
const wishListModel = require('../Model/userWishLIstModel')





let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vishnurb4vishnu@gmail.com',
        pass: 'wkwhsremxdzqqjsg'
    }
});

const OTP = `${Math.floor(1000+ Math.random() * 9000 )}`;

const showLandingPage =async(req,res)=>{
    let cartCount = null 
    let wishListCount = null

  if(req.session.user){
    cartCount= await cartModel.getCartCount(req.session.user._id)
    wishListCount= await wishListModel.getWishListCount(req.session.user._id)
}
    
    userProductDisplay.displayProduct().then((productDetails)=>{
    categoryDisplay.showCategory().then((category)=>{
        banner.showBanner().then((banner)=>{
            let userData=req.session.user
            res.render("user/index",{admin:false,user:true,productDetails,category,banner,userData,cartCount,wishListCount})
        })
        
    })
    })
   
}

const showLoginPage =(req,res)=>{
    
    res.render('user/userLoginPage',{admin:false,user:false})
}

const showSignUpPage =(req,res)=>{
    res.render('user/userSignUpPage',{admin:false,user:false})
}

const userSignupAction=(req,res)=>{
    let verified = 0
    let state = 'active'
    const {firstName,lastName,email,password}=req.body

    let mailDetails = {
        from: 'vishnurb4vishnu@gmail.com',
        to: email,
        subject: 'Eshopper registration',
        html: `<p>your otp for registration is ${OTP}</p>`
    };
     
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });

    userDetails.insertUserCredentials(verified,firstName,lastName,email,password,state).then((response)=>{

        userID=response.insertedId
     
        res.render("user/useOtpVerificationPage",{admin:false,user:false})
    })

}
const userLoginAction =(req,res)=>{
    console.log("userLoginAction",req.body)
    userDetails.doLogin(req.body).then((response)=>{
        if(response.status)
        {
            req.session.loggedIn = true
            req.session.user=response.user
            userProductDisplay.displayProduct().then((productDetails)=>{
                categoryDisplay.showCategory().then((category)=>{
                    banner.showBanner().then((banner)=>{
                        res.redirect("/")
                    })
                  

                    
                })
            })
           
        }else{
            res.render('user/userLoginPage',{admin:false,user:false})
        }
    })
}

const verifyOtp=async(req,res)=>{

    console.log("hh",req.body)
    let cartCount = null 
    let wishListCount = null
    if(OTP==req.body.otpSend){
    req.session.loggedIn=true
    userDetails.userVerified(userID).then((response)=>{
        userProductDisplay.displayProduct().then(async(productDetails)=>{
        categoryDisplay.showCategory().then(async(category)=>{
            banner.showBanner().then(async (banner)=>{
                req.session.user=response.user
                let userData=response.user

                if(req.session.user){
                    cartCount= await cartModel.getCartCount(req.session.user._id)
                    wishListCount= await wishListModel.getWishListCount(req.session.user._id)
                }


                res.render('user/index',{admin:false,user:true,productDetails,category,banner,userData,cartCount,wishListCount})
            })
           
        })
        })
       
    })
       
    }else
    {
        
        console.log("otp verification false")
    }
}

const userLogout=(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log('error')
        }else{
            res.redirect('/')
        }
    })
}


module.exports ={
    showLandingPage,
    showLoginPage,
    showSignUpPage,
    userSignupAction,
    userLoginAction,
    verifyOtp,
    userLogout
}
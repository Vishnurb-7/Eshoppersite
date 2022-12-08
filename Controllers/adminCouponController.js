const couponModel =require ('../Model/adminCouponModel')

const showCouponPage = (req,res)=>{
    couponModel.displayCoupon().then((availableCoupons)=>{
  
      res.render('admin/adminCouponPage',{admin:true,user:false,title:'COUPON CONTROL PAGE',availableCoupons})
    })
    
  }
  const addCoupon = (req,res)=>{
    couponModel.addCoupon(req.body).then(()=>{
      couponModel.displayCoupon().then((availableCoupons)=>{

        // console.log('addcoupon reached');
  
        res.render('admin/adminCouponPage',{admin:true,user:false,title:'COUPON CONTROL PAGE',availableCoupons})
      })
    })
  }
  
  const deleteCoupon = (req,res)=>{
    let couponId = req.query.id
  couponModel.deleteCoupon(couponId).then(()=>{
    couponModel.displayCoupon().then((availableCoupons)=>{
      res.render('admin/adminCouponPage',{admin:true,user:false,title:'COUPON CONTROL PAGE',availableCoupons})
    })
  })
  }
  
  module.exports = {
    showCouponPage,
    addCoupon,
    deleteCoupon
  }
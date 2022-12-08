

const couponModel = require('../Model/userCouponModel')
const cartCheckOutModel = require ('../Model/userCheckOutModel')




const applyCoupon = async (req,res) => {
    // console.log("coupon body =>", req.body);
  
    let userData = req.session.user;
    let couponCode = req.body.couponCode;
    let totalAmount = await cartCheckOutModel.TotalAmount(userData._id);//total of cart
    let TOTAL = totalAmount[0].total;//cart Total
    // console.log("userData ====>", userData);
    // console.log("couponCode ===>", couponCode);
    // console.log("total amount ===>>", TOTAL);
    let couponDetails = await couponModel.getCouponDetails(couponCode);
    await couponModel.getDiscount(couponDetails, TOTAL).then((response) => {
      // console.log('**********************************',response);
      res.json(response);
    });
}

module.exports = {
  applyCoupon,
}
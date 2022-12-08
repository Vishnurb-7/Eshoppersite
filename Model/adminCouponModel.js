const db = require('../config/connection')
const collection = require("../config/collection");
const { ObjectID } = require('bson');


module.exports = {
    addCoupon: (couponDetails) => {
        couponDetails.discount = parseInt(couponDetails.discount)
        return new Promise((resolve, reject) => {
          db.get().collection(collection.COUPON).insertOne(couponDetails).then((response) => {
              resolve()
            });
        });
      },
      displayCoupon:()=>{
        return new Promise(async(resolve,reject)=>{
          let coupons = await db.get().collection(collection.COUPON).find().toArray()
          // console.log("couponnnn",coupons);
          resolve(coupons)
        })
      },
      deleteCoupon:(couponId)=>{
        return new Promise((resolve,reject)=>{
          db.get().collection(collection.COUPON).deleteOne({_id:ObjectID(couponId)})
          resolve()
        })
      }
}
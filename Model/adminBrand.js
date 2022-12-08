const db=require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')

module.exports={
    insertBrand:(brand)=>{
        return new Promise (async(resolve,reject)=>{
          
            db.get().collection(collection.BRAND).insertOne(brand).then((data)=>{
                resolve.apply(data)
            })
        })
    },
    showBrand:()=>{
        return new Promise(async(resolve,reject)=>{
            let Brand= await db.get().collection(collection.BRAND).find().toArray()
            resolve(Brand)
        })
    },
    deleteBrand:(brandId)=>{
        return new Promise(async(resolve,reject)=>{
          db.get().collection(collection.BRAND).deleteOne({_id:ObjectId(brandId)}).then((response)=>{
            resolve(response)
          })
        })
      },

      checkProducts:(brandId)=>{
        return new Promise(async(resolve,reject)=>{
          let brandDetails = await db.get().collection(collection.BRAND).findOne({ _id:ObjectId(brandId)})
          let products  = await db.get().collection(collection.PRODUCT).find({brandName:brandDetails.newBrand}).toArray()
          // console.log('the products of this category is',products);
          resolve(products)
        })
      }
     
}
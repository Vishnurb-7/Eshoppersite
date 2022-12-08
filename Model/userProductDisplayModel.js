const db =require('../config/connection')
const collection=require('../config/collection')
const { promise } = require('bcrypt/promises')
const { ObjectId } = require('mongodb')

module.exports={
    displayProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let productDetails = await db.get().collection(collection.PRODUCT).find().toArray()
            resolve(productDetails)
           
        })
    },

    viewProductDetails:(productId)=>{
        return new Promise((resolve,reject)=>{
           let bbbb=  db.get().collection(collection.PRODUCT).findOne({_id:ObjectId(productId)}).then((product)=>{
           
              resolve(product)
              
            })
        })
      }
}
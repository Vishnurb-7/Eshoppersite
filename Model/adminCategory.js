const db =require('../config/connection')
const collection =require('../config/collection');
const { ObjectId } = require('mongodb');
const { reject } = require('bcrypt/promises');

module.exports ={
    doCategory:(imageId,addCategory)=>{
        return new Promise (async(resolve,reject)=>{
           
            db.get().collection(collection.ADD_CATEGORY).insertOne(imageId,addCategory).then((data)=>{
                resolve.apply(data)
            })
        })
    },
    showCategory:()=>{
        return new Promise(async(resolve,reject)=>{
            let Category= await db.get().collection(collection.ADD_CATEGORY).find().toArray()
            resolve(Category)
        })
    },
    deleteCategory:(categoryId)=>{
        return new Promise(async(resolve,reject)=>{
          db.get().collection(collection.ADD_CATEGORY).deleteOne({_id:ObjectId(categoryId)}).then((response)=>{
            resolve(response)
          })
        })
      },

      checkProducts:(categoryId)=>{
        return new Promise (async(resolve,reject)=>{
            let categoryDetails = await db.get().collection(collection.ADD_CATEGORY).findOne({_id:ObjectId(categoryId)})
            let products = await db.get().collection(collection.PRODUCT).find({categoryName:categoryDetails.newCategory}).toArray()
            // console.log('the product of the category is');
            resolve(products)
        })
      }
}
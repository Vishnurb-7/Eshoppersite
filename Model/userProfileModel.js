const db = require('../config/connection')
const collection =require("../config/collection")
const { ObjectID } = require('bson')
const { response } = require('express')
const bcrypt = require('bcrypt')



module.exports ={
    getUserOrder:(userId)=>{
        return new Promise (async(resolve,reject)=>{
            let orders = await db.get().collection(collection.ORDER).find({userId:ObjectID(userId)}).toArray()
            resolve(orders)
        })    
    },

    editUserProfile:(userDetails,userData)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collection.USER).updateOne({_id: ObjectID(userData._id)},{$set:{username: userDetails.username,useremail:userDetails.useremail,address: userDetails.address}}).then((response)=>{
                resolve();
            })
        })
    },
    findUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let user = await db.get().collection(collection.USER).findOne({_id:ObjectID(userId)})
            resolve(user)
        })
    },
    updatePassword:(newPassword,user)=>{
        return new Promise (async(resolve,reject)=>{
            // console.log('passsss',newPassword);

            // console.log('newwPasssss',user);
            newPassword = await bcrypt.hash(newPassword.password,10)
            // console.log('passssshhhhhhhhhhhh',newPassword);

            db.get().collection(collection.USER).updateOne({_id:ObjectID(user._id)},
            {
                $set:{
                    password:newPassword
                }
            }
            )
            resolve()

        })
    },

    
    getOrderProductDetails:(orderId)=>{
        return new Promise(async(resolve,reject)=>{
          let orders = await db.get().collection(collection.ORDER).aggregate([
            {
              $match:{_id:ObjectID(orderId)}
            },
            {
              $unwind:'$products'
            },
            {
              $lookup:{
                from:collection.PRODUCT,
                localField:'products.item',
                foreignField:'_id',
                as:'orderProducts'
              }
            },
            {
              $lookup:{
                from:collection.USER,
                localField:'userId',
                foreignField:'_id',
                as:'user'
              }
            },
            {
              $project:{
                _id:0,
                orderProducts:1,
                deliveryDetails:1,
                user:1,
                date:1,
                status:1

              }
            }
          ]).toArray()
          // console.log('this is orders',orders);
          resolve(orders)
        })
      },


      getOneProduct :(orderId)=>{
        
        return new Promise(async(resolve,reject)=>{
            let oneProduct = await db.get().collection(collection.ORDER).aggregate([
                {
                    $match:{_id:ObjectID(orderId)}
                },
                {
                    $unwind:'$products'
                },
                {
                    $lookup:{
                        from:collection.PRODUCTS,
                        localField:'products.item',
                        foreignField:'_id',
                        as:'orderproducts'
                    }
                },
                {
                    $project:{
                        orderproducts:1
                    }
                }
            ]).toArray()
            resolve(oneProduct)
          })
         }




}
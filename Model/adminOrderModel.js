const db = require('../config/connection')
const collection = require('../config/collection')
const { resolveContent } = require('nodemailer/lib/shared')
const { response } = require('express')
const { ObjectID } = require('bson')


module.exports = {
    showOrder:()=>{
        return new Promise((resolve,reject)=>{
 
    let orderList = db.get().collection(collection.ORDER).find().toArray()
    resolve(orderList)
        })
    },

    updateOrderStatus:(orderId,newStatus)=>{

      
        return new Promise(async(resolve,reject)=>{
          await db.get().collection(collection.ORDER).updateOne({_id:ObjectID(orderId)},{
            $set:{
              status:newStatus
            }
          })
          resolve(response)
       
        })
      },
      chartDetailsCount:()=>{
        return new Promise(async(resolve,reject)=>{
          let deliveredOrder = await db.get().collection(collection.ORDER).find({status:'delivered'}).toArray()
          let deliveredOrderLength = deliveredOrder.length
          let orderplaced = await db.get().collection(collection.ORDER).find({status:'Placed'}).toArray()
          let orderPlacedLength  = orderplaced.length
          let shippedOrder = await db.get().collection(collection.ORDER).find({status:'shipped'}).toArray()
          let shippedOrderLength = shippedOrder.length 
          let totalOrders = await db.get().collection(collection.ORDER).find().toArray()
          let totalOrdersLength = totalOrders.length
          resolve({deliveredOrderLength,shippedOrderLength,orderPlacedLength,totalOrdersLength})
        })
      }
}
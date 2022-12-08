const db =require('../config/connection')
const collection =require('../config/collection');
const { ObjectId } = require('mongodb');
const { reject } = require('bcrypt/promises');
const { response } = require('express');



module.exports={

    displayUser:()=>{
        return new Promise( async(resolve,reject)=>{
            let user= await db.get().collection(collection.USER).find().toArray()
            resolve(user)
        })
    
    },
    blockUser:(userId)=>{
      return new Promise ((resolve,reject)=>{
        db.get().collection(collection.USER).updateOne({_id:ObjectId(userId)},
          {
            $set:{
              state:"blocked"
            }
          }
        
        ).then((response)=>{
          resolve(response)
        })

      })
    },
    unblockUser:(userId)=>{
      return new Promise ((resolve,reject)=>{
        db.get().collection(collection.USER).updateOne({_id:ObjectId(userId)},
          {
            $set:{
              state:"active"
            }
          }
        
        ).then((response)=>{
          resolve(response)
        })

      })
    }

}
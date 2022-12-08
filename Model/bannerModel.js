const db = require('../config/connection')
const collection =require("../config/collection")
const { reject } = require('bcrypt/promises')
const { ObjectId } = require('mongodb')
const { response } = require('express')


module.exports={
    insertBanner:(imageID,bannerData)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collection.BANNER).insertOne(imageID,bannerData).then((data)=>{
                resolve.apply(data)
            })
        })
    },
    showBanner:()=>{
        return new Promise(async(resolve,reject)=>{
            let banner= await db.get().collection(collection.BANNER).find().toArray()
            resolve(banner)
        })
    },
    deleteBanner:(bannerId)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collection.BANNER).deleteOne({_id:ObjectId(bannerId)}).then((response)=>{
                resolve(response)
            })
        })
    }


}




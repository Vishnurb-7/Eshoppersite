const db = require('../config/connection')
const collection =require('../config/collection');
const { ObjectID } = require('bson');


module.exports={
    addToWishList:(proId,userId)=>{
        let proObj={
            item:ObjectID(proId),
            quantity:1
        }
        // console.log(proId,"dkjdfjdfj");
        return new Promise(async(resolve,reject)=>{
            let userWishlist = await db.get().collection(collection.WISHLIST).findOne({user:ObjectID(userId)})
      
            if(userWishlist){
                let proExist = userWishlist.products.findIndex(product => product.item == proId)
                if(proExist!=-1){
                    db.get().collection(collection.WISHLIST).updateOne({user:ObjectID(userId),'products.item':ObjectID(proId)},
                    {
                        $inc:{ 'products.$.quantity':1}
                    }).then(()=>{
                        resolve()
                    })
                }else{
                    db.get().collection(collection.WISHLIST).updateOne({user:ObjectID(userId)},
                    {
                        $push:{products:proObj}
                    }).then((response)=>{
                        resolve
                    })
                }

            }else{
                let cartObj={
                    user:ObjectID(userId),
                    products:[proObj]
                }
                db.get().collection(collection.WISHLIST).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })
    },
    getWishListProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            
            let wishListItems= await db.get().collection(collection.WISHLIST).aggregate([
                {
                    $match:{user:ObjectID(userId)}
                },
                {
                    $unwind:'$products'
                },
                {
                   $project:{
                    item:'$products.item',
                    quantity:'$products.quantity',
                   } 
                },
                {
                    $lookup:{
                        from:collection.PRODUCT,
                        localField:'item',
                        foreignField:'_id',
                        as:'product'
                    }
                },
                {
                    $project:{
                        item:1,quantity:1,productDetails:{$arrayElemAt:['$product',0]}
                    }
                }
                
            ]).toArray()
            // console.log(wishListItems,"wishlistitemmmmmmmmmm");
            resolve(wishListItems)
        })
    },
    getWishListCount:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let count = 0
            let wishList =await db.get().collection(collection.WISHLIST).findOne({user:ObjectID(userId)})
            if(wishList){
                count=wishList.products.length
            }
            resolve(count)
        })
    },
    removeWishListProduct:(details)=>{
        return new Promise((resolve,reject)=>{
          console.log(details);
          db.get().collection(collection.WISHLIST).updateOne(
            {_id:ObjectID(details.wishList)},
            {
              $pull:{products:{item:ObjectID(details.product)}}
            }
            
          ).then(()=>{
            resolve({productRemoved:true})
       })
    })
    }

}


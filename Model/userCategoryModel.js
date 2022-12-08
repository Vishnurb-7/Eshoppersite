const db = require('../config/connection')
const collection =require('../config/collection')

module.exports={

    showCategoryBasedProducts:(catName)=>{
        // console.log('catnameeeee',catName);
        return new Promise (async(resolve,reject)=>{

           const products = await db.get().collection(collection.PRODUCT).aggregate([
                {
                    $match:{categoryName:catName}
                }
            ]).toArray()
            resolve(products)
            // console.log('categorymodellllll',products);
        })
    }
}
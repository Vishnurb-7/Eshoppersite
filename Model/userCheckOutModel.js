const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectID } = require("bson");

module.exports = {
  TotalAmount: (userId) => {
    return new Promise(async (resolve, reject) => {
      let total = await db
        .get()
        .collection(collection.CART)
        .aggregate([
          {
            $match: { user: ObjectID(userId) },
          },
          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
            },
          },
          {
            $lookup: {
              from: collection.PRODUCT,
              localField: "item",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              productDetails: { $arrayElemAt: ["$product", 0] },
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: {
                  $multiply: ["$quantity", ("$productDetails.sellingPrice")],
                },
              },
            },
          },{
            $project:{
              _id:0,
              total:1
            }
          }
        ])
        .toArray();

      resolve(total);
    });
  },
};

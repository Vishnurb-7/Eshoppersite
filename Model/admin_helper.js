const bcrypt=require('bcrypt')
const collection = require('../config/collection')
const db= require('../config/connection')

module.exports={
    adminDoLogin:(adminData)=>{
        
        return new Promise(async(resolve,reject)=>{
          let response ={}
            // console.log(adminData);
            let admin=await db.get().collection(collection.ADMIN_CREDENTIALS).findOne({username:adminData.adminName})
            if(admin){
                bcrypt.compare(adminData.password,admin.password).then((status)=>{
                    if(status){
                        // console.log("login success");
                        response.user=admin
                        response.status=true
                        resolve(response)
                    }else{
                        // console.log("login failed")
                        resolve({status:false})
                    }
                })
            }else{
                // console.log("login not success")
                resolve({status:false})
            }
        })
    }
}
const {response}= require('express')
const addUser= require('../Model/adminUser')



const adminUserPage=(req,res)=>{
   
        addUser.displayUser().then((Users)=>{
            res.render('admin/adminUserPage',{admin:true,user:false,title:'USER CONTROL PAGE',Users})
        })
    }

// const deleteUser=(req,res)=>{
//     let userId = req.query.id
//     addUser.deleteUser(userId).then((response)=>{
//         res.redirect("/admin/adminUserPage")
//     })
// }

const userBlock =(req,res)=>{
    addUser.blockUser(req.body.userId).then((response)=>{
        res.json({status:true})
    })
}

const userUnblock = (req,res)=>{
    addUser.unblockUser(req.body.userId).then((response)=>{
        res.json({status:true})
    })
}



module.exports={
    adminUserPage,
    userBlock,
    userUnblock
}


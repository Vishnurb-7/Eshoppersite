const { response } = require('express')
const adminLogin=require('../Model/admin_helper')


const adminLoginPage=(req,res)=>{
  
        res.render('admin/adminHome',{admin:true,title:'ADMIN HOME PAGE'})
    }


const adminLoginAction=(req,res)=>{
    // console.log(req.body)
    adminLogin.adminDoLogin(req.body).then((response)=>{
        if(response.status)

        {
            req.session.admin=true
            res.render('admin/adminHome',{admin:true,user:false,title:'ADMINHOME'})
        }else{
            res.redirect('/admin')
        }      
    })
}

const adminHome=(req,res)=>{
  
        res.render('admin/adminHome',{admin:true,title:'ADMIN HOME PAGE'})
    }
    
const adminOrderListPage=(req,res)=>{
    res.render('admin/adminOrderList',{admin:true,title:'ORDER LIST PAGE'})
}

const adminSignOut=(req,res)=>{
    req.session.destroy(function(err){
        if(err)
        console.log('error')
        else
        res.redirect('/admin')
    })
    
}
module.exports={
    adminLoginPage,
    adminLoginAction,
    adminHome,
    adminOrderListPage,
    adminSignOut
}
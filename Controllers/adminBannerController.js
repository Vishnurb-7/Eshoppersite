
const { response } = require('express')
const Banner =require('../Model/bannerModel')


const adminBannerPage=(req,res)=>{
  
        Banner.showBanner().then((banner)=>{
            res.render('admin/adminBannerPage',{admin:true,title:'BANNER CONTROL PAGE',banner})
        })
    }

const addNewBanner=(req,res)=>{
    
        const {
            newBanner

        }=req.body
        Banner.insertBanner({
            picture:req.file.path,
            newBanner
        }).then((response)=>{
            res.redirect('/admin/adminBannerPage')
        })
    }
    
const deleteBanner=(req,res)=>{
    let id = req.body.bannerId
    // console.log("hhh",id)

    Banner.deleteBanner(id).then((response)=>{
        res.json(response)
    })

}





module.exports={
    adminBannerPage,
    addNewBanner,
    deleteBanner
}


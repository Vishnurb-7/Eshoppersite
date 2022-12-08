const { response } = require('express')
const adminCategory =require('../Model/adminCategory')


const adminCategoryPage=(req,res)=>{
  
        adminCategory.showCategory().then((category)=>{
            res.render('admin/adminCategoryPage',{admin:true,title:'CATEGORY CONTROL PAGE',category})
    
        })
    }
const addNewCategory=(req,res)=>{ 
    console.log(req.file);
    const {
        newCategory
    }=req.body
   
        adminCategory.doCategory({
            picture:req.file.path,
            newCategory   
        }).then((response)=>{
            res.redirect('/admin/adminCategoryPage')
        })
    }
    const deleteCategory=async (req,res)=>{
        
        let categoryId = req.query.id

        await adminCategory.checkProducts(categoryId).then((products)=>{
            if(products.length >0){
                response.status = false;
                res.json(response);
            }else {
                adminCategory.deleteCategory(categoryId).then((response)=>{
                    res.json(response);
                })
            }
        })
  
    }
  



module.exports={
      adminCategoryPage,
      addNewCategory,
      deleteCategory
}
const {response}= require('express')

const addProduct=require('../Model/adminProduct')
const category= require('../Model/adminCategory')
const Brand =require('../Model/adminBrand')



const adminProductPage=(req,res)=>{
    
 
    
        addProduct.showProduct().then((product)=>{
            res.render('admin/adminProductPage',{admin:true,title:'PRODUCT CONTROL PAGE',product})
        })
    }

const adminAddProductPage=(req,res)=>{ 
   
        category.showCategory().then((categoryDetails)=>{
            Brand.showBrand().then((brandDetails)=>{
                res.render('admin/adminAddProductPage',{admin:true,title:'ADD PRODUCT PAGE',categoryDetails,brandDetails})
            })
            })
    }

  const addNewProduct=(req,res)=>{
    
        const {
            productName,
            actualPrice,
            sellingPrice,
            categoryName,
            brandName,
            quantityName,
            productDescription,
            addToTrendingProduct,
            addToNewlyArrivedProduct

        }=req.body
        // console.log(req.file)

    



    
        addProduct.insertProduct({
            picture:req.file.path,
            productName,
          actualPrice,
           sellingPrice,
            categoryName,
            brandName,
            quantityName,
            productDescription,
            addToTrendingProduct,
            addToNewlyArrivedProduct

            
        }).then((response)=>{
            res.redirect('/admin/adminProductPage')
        })
    }

  const updateProductionDetailsAction =(req,res)=>{
    // console.log("file:",req.file.id);
        let id  =req.params.id;
        let newProductData =req.body;
        let newImageId =req.file.path;
        // console.log(id);
        // console.log("data",newImageId)
        addProduct.editProduct(id, newProductData, newImageId).then((response)=>{
           
            res.redirect('/admin/adminProductPage')
        })
    }
  

const adminDeleteProduct=(req,res)=>{
    
        let productId = req.query.id
        addProduct.deleteProduct(productId).then((response)=>{
            res.redirect('/admin/adminProductPage')
        })
    }

const updateProductDetails =async(req,res)=>{
   
    
    
        let productid =req.query.id
    let product = await addProduct.showOneProduct(productid)

    category.showCategory().then((categoryDetails)=>{
    Brand.showBrand().then((brandDetails)=>{
       console.log("pod",product);
        res.render("admin/adminEditProduct",{admin:true,user:false,title:"EDIT PRODUCT PAGE",categoryDetails,brandDetails,product})
    })
    })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }


module.exports={
    adminProductPage,
    adminAddProductPage,
    addNewProduct,
    adminDeleteProduct,
    updateProductDetails,
    updateProductionDetailsAction

   }
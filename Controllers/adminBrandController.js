const {response}= require('express')
const adminBrand =require('../Model/adminBrand')


const adminBrandPage=(req,res)=>{
  
        adminBrand.showBrand().then((brand)=>{
            res.render('admin/adminBrandPage',{admin:true,title:'BRAND PAGE',brand})
        }) 
    }

const adminShowBrand=(req,res)=>{
   
        adminBrand.insertBrand(req.body).then((response)=>{
            res.redirect('/admin/adminBrandPage')
        })
    }

const adminDeleteBrand=(req,res)=>{
   
        let brandId = req.query.id
        
    adminBrand.deleteBrand(brandId).then((response)=>{
        res.redirect('/admin/adminBrandPage')
    })
    }

// const adminDeleteBrand = async (req, res) => {
//     let brandId = req.query.id;
//     await adminBrand.checkProducts(brandId).then((products) => {
//       if (products.length > 0) {
//         console.log('reached if of brand');
//         response.status=false;
//         res.json(response);
//        } else {
//         console.log("reached else");
//         adminBrand.deleteBrand(brandId).then((response) => {
//           response.status = true;
//           console.log(response.status);
//           res.json(response);
//         });
//       }
//     });
//   };


module.exports={
    adminBrandPage,
    adminShowBrand,
    adminDeleteBrand
}
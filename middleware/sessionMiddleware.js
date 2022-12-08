

const userSessionChecker=(req,res,next)=>{
    
    if (req.session.loggedIn){
        next()
    }else{
        res.render("user/userLoginPage",{admin:false,user:false})
    }
}

const adminSessionChecker = (req,res,next)=>{
    if(req.session.admin){
        next()
    }else{
        res.render("admin/adminLogin",{admin:false,user:false})
    }
}


module.exports={
    userSessionChecker,
    adminSessionChecker
}
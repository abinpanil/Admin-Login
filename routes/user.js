var express = require('express');
const { response } = require('../app');
var router = express.Router();
var userHelpers = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  user = req.session.user
  res.render('index', { admin:false,user });
});

const verifylogin=(req,res,next)=>{
  if(req.session.logedIn){
    res.redirect("/")
  }else{
next()
  }
}




router.get('/signin',verifylogin,(req,res)=>{

  let user = req.session.user
  if(user){
    res.redirect('/')
  }else{
    res.render('signin', { admin:false,user });
  }
    
  
  
})
router.get('/signup',(req,res)=>{
  let user = req.session.user
  res.render('signup',{user})
})
router.post('/signup',(req,res)=>{
  let values = req.body
 
  userHelpers.adduser(req.body).then((respose)=>{
   
    res.redirect('/signin')
  }).catch((err)=>{
    console.log(err)
  })
  
})
router.post('/login',(req,res)=>{
  
  userHelpers.loginUser(req.body).then((response)=>{
    if(response.status){
      req.session.logedIn = true
      req.session.user = response.user

      res.redirect("/")
    }else{
      res.redirect("/signin")
    }
  })

})
router.get('/logout',(req,res)=>{
  console.log(req.session);
  delete req.session.user
  req.session.logedIn = false
  res.redirect("/")
})
router.post('/home',(req,res)=>{

 
  res.redirect('/')
})




module.exports = router;

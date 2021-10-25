var express = require('express');
const { response } = require('../app');
var router = express.Router();
var userHelpers = require('../helpers/user-helpers');

 

/* GET users listing. */
router.get('/', function(req, res, next) {
  user = req.session.user
  
 
  userHelpers.getAllUsers().then((users)=>{

    res.render('admin/view-users', { admin:true, users ,user});
  })
  
  
});

router.post('/adduser',(req,res)=>{
  userHelpers.adduser(req.body).then((response)=>{
    console.log(req.body)
    res.redirect('/admin')
  }).catch((err)=>{
    console.log(err);
  })
})

router.post('/deleteuser',(req,res)=>{
  let userId=req.body.id
  userHelpers.deleteUser(userId).then((response)=>{
    console.log(response)
    res.json({})
  }).catch((err)=>{
    console.log("Error")
  })
  
})
router.post('/blockuser',(req,res)=>{
  let userId = req.body.id
  
  userHelpers.blockUser(userId).then(data=>{

    res.json(data);
  }).catch(err=>{
    res.json(err);
  })

})

router.post('/edituser/',(req,res)=>{
  // let userId=req.body.id
  // let user=req.body
  // console.log(user);
  

  userHelpers.updateUser(req.body).then((response)=>{
    res.redirect('/admin')
    // res.json({})
  }).catch((e)=>{
    console.log("Error");
  })
  
})

// router.post('/deleteuser', function (req, res) {
//   var id = req.body.id
//   console.log("DELETE");
//   console.log(id);
//   //console.log({_id: new mongo.ObjectId(id)}+"IDDDD......");
 

//     db.get().collection(collections.USERS_COLLECTION).deleteOne({ _id:objectId(id) }).then((response)=>{
//     console.log(response);
//     })
  

//   //res.json({ success: id })
// });
module.exports = router;

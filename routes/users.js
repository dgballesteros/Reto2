var express = require('express');
var router = express.Router();

var dataService = require("../data/dataService");

router.post("/",function(req,res,next){
  const username = req.body.username;
  const password = req.body.password;
  
  if(dataService.validateUser(username,password) ){
    req.session.isLogged = true;
    req.session.username = username;
    res.redirect("/?success=login")
  } else{
    res.render("login",{error:"No existe el usuario"})
  }
});

module.exports = router;

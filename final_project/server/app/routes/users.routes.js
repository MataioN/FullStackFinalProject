module.exports = app => {
    const users = require("../app/controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Signup
    router.post("/signup", users.signup);
    

    // Login
    router.post("/login", users.login);
  
    app.use('/api/users', router);
  };
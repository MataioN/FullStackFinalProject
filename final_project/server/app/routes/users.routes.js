module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Signup
    router.post("/signup", users.signup);
    

    // Login
    router.post("/login", users.login);

    router.get("/profile", users.profile);
  
    app.use('/api/users', router);
  };
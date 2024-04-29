const sql = require("./db.js");

const User = function(user) {
    this.Name = user.Name;
    this.Username = user.Username;
    this.Email = user.Email;
    this.Password = user.Password;
  };
  
User.create = (newUser, result) => {
    sql.query("INSERT INTO Users (Name, Username, Email, Password) VALUES (?, ?, ?, ?)", [newUser.Name, newUser.Username, newUser.Email, newUser.Password], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };
User.findById = (id, result) => {
    sql.query(`SELECT * FROM Users WHERE Id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  };

  User.findByUsername = (username, result) => {
    console.log('finding username');
    console.log(username);
    sql.query(`SELECT * FROM Users WHERE Username = ?`, [username],(err, res) => {
      if (err) {
        console.log("error: ", err);
        console.error(err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found username: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  };

  User.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM Users WHERE Email = ${email}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        console.error(err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found email: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  };

  module.exports=User;
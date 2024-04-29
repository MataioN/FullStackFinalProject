import { query } from "./db.js";

const User = function(user) {
    this.Name = user.Name;
    this.Username = user.Username;
    this.Email = user.Email;
    this.Password = user.Password;
  };

User.create = (newUser, result) => {
    query("INSERT INTO Users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created tutorial: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };
User.findById = (id, result) => {
    query(`SELECT * FROM Users WHERE Id = ${id}`, (err, res) => {
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
    query(`SELECT * FROM Users WHERE Username = ${username}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
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
    query(`SELECT * FROM Users WHERE Email = ${email}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
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
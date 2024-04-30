const User = require("../models/user.model.js");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


async function signup(req, res) {
    try{
    console.log("requested signup");
    const salt = await bcrypt.genSalt(10);
    const encrypted_password = await bcrypt.hash(req.body.Password, salt);
    console.log(salt);

    const user = {
      Name: req.body.Name,
      Username: req.body.Username,
      Email: req.body.Email,
      Password: encrypted_password 
    };
    console.log(user);
    User.create(user, (err, data) => {
        if (err) {
          if (err.sqlMessage && err.sqlMessage.includes('Duplicate entry')) {
            return res.status(200).json({ error: "Username or email already exists." });
          } else {
            console.error("Error signing up:", err);
            return res.status(500).json({ error: "Error signing up" });
        }
        }
        var token = jwt.sign({ id: data.id }, 'super_secret_key', { expiresIn: '1h' });
        return res.status(201).json({ success: "Signed up successfully",
                                      username: req.body.Username,
                                      token: token });
      });
    } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).json({ error: "Internal server error" });
    }
}

function login(req,res) {
    const {username, password} = req.body;
    console.log(username);


    User.findByUsername(username, async (err,user)=> {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!user) {
            return res.status(400).json({ error: "Username doesn't exist" });
        }
        const row = user;
        const encrypted_password = row.Password;

        password_res = await bcrypt.compare(password, encrypted_password);
        console.log(password_res);
  
        if (password_res) {
          // if the password was correct, generate a JWT token and send it back to the user
          var token = jwt.sign({ id: row.id }, 'super_secret_key', { expiresIn: '1h' });
  
          return res.status(200).json({ message: "success", token: token, id: row.id})
        } else {
          return res.status(401).json({ error: 'Incorrect username or password.' });
        }
});
    }
  
function profile(req, res){
  const token = req.headers.token;
  console.log(token);
  // verify the token. This is where we check if the user is "logged in"
  let decoded;
  try {
    decoded = jwt.verify(token, "super_secret_key")
  } catch (error) {
    return res.status(401).json({ error: "invalid token, please login again"})
  }

  console.log(decoded);

  try {

  User.findById(decoded.id, (err, data)=> {
    if (err) {
      return res.status(404).json({Error: 'Could not retrieve profile data'});
    }
    else {
      console.log(data);
      return res.status(200).json({Name: data.Name, Username: data.Username, Email: data.Email});
    }
  });
} catch (error) {
  console.error("Error retrieving profile data:", error);
  return res.status(500).json({ error: "Could not retrieve profile data" });
}


}
module.exports = {
      signup,
      login,
      profile
  };

const User = require("../models/users.model.js");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


export async function signup(req, res) {
    try{
    const salt = await bcrypt.genSalt(10);
    const encrypted_password = await bcrypt.hash(req.body['Password'], salt);

    User.findByUsername(req.params.Username,(err,user)=> {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
          }
          if (userN) {
            return res.status(400).json({ error: "Username already in use" });
          }
      
          // Check if the email already exists
          User.findByEmail(Email, (err, userE) => {
            if (err) {
              return res.status(500).json({ error: "Internal server error" });
            }
            if (userE) {
              return res.status(400).json({ error: "Email already in use" });
            }

            const user = new User({
                Name: req.body.Name,
                Username: req.body.Username,
                Email: req.body.Email,
                Password: encrypted_password 
            });

            User.create(user, (err, data) => {
                if (err) {
                  res.status(500).json({ error: "Error signing up" }); }
                  return res.status(201).json({ success: "Signed up successfully",
                                                username: req.body.Username });
              });
          });
      
    }); 
} catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).json({ error: "Internal server error" });
}
}

export function login(req,res) {
    const {Username, Password} = req.body;

    User.findByUsername(Username, async (err,user)=> {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!user) {
            return res.status(400).json({ error: "Username doesn't exist" });
        }
        const row = user[0];
        const encrypted_password = row.Password;

        password_res = await compare(Password, encrypted_password)
  
        if (password_res) {
          // if the password was correct, generate a JWT token and send it back to the user
          var token = jwt.sign({ id: row.id }, 'super_secret_key', { expiresIn: '1h' });
  
          return res.status(200).json({ message: "success", token: token, id: row.id})
        } else {
          return res.status(401).json({ error: 'Incorrect username or password.' });
        }
});
    }

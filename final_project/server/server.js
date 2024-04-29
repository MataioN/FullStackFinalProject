const express = require('express');
const cors = require('cors');
//const bcrypt = require('bcrypt');
const app = express();
//var jwt = require('jsonwebtoken');

/**const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies**/

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//const PORT = process.env.PORT || 5000;

// allow CORS everywhere
//app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173' // Replace with your client-side domain
}));

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

require("./app/routes/users.routes.js")(app);

app.listen(3001, () => {
  console.log(`Server running on port ${3001}`);
});

/*
// use SQLite database
//const sqlite3 = require('sqlite3').verbose();

//create database file:
const db = new sqlite3.Database('myDatabaseFile.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  }
);

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Name VARCHAR(50),
      Username TEXT UNIQUE NOT NULL ,
      Password TEXT NOT NULL, 
      Token  TEXT,
      Spotify_id TEXT,
      Session INT, 
      Email VARCHAR(100),
      FOREIGN KEY (Session) References Sessions(Id)
    );
    CREATE TABLE IF NOT EXISTS Sessions (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        State INT NOT NULL,
        Num_users INT,
        Playback_song TEXT,
        Playlist TEXT,
        Karaoke_state TEXT NOT NULL  
    );
    CREATE TABLE IF NOT EXISTS Follows (
        Following_id INT NOT NULL,
        Followed_id INT NOT NULL,
        FOREIGN KEY (Following_id) References Users(Id),
        FOREIGN KEY (Followed_id) References Users(Id)
    );
    CREATE TABLE IF NOT EXISTS Music_posts (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Body TEXT NOT NULL,
        User INT NOT NULL,
        Image TEXT,
        State INT NOT NULL,
        FOREIGN KEY (User) References Users(Id)
    );
    CREATE TABLE IF NOT EXISTS Saved_posts (
        Post_id INT UNIQUE NOT NULL,
        User_id INT NOT NULL,
        FOREIGN KEY (Post_id) References Music_posts(Id),
        FOREIGN KEY (User_id) References Users(Id)
    ); `, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Created users table.');
      }
    );
});

app.post('/signup', async (req, res) => {
    // retrieve all the information we need from the query parameters
      try {
      const {Name, Username, Email, Password} = req.body;

      // Check if username exists
      const usernameCount = await new Promise((resolve, reject) => {
        const sq = "SELECT COUNT(*) AS count FROM Users WHERE Username = ?";
        db.get(sq, Username, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.count);
            }
        });
    });

    // Check if email exists
    const emailCount = await new Promise((resolve, reject) => {
        const sq2 = "SELECT COUNT(*) AS count FROM Users WHERE Email = ?";
        db.get(sq2, Email, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.count);
            }
        });
    });
    if (usernameCount > 0 || emailCount > 0) {
      return res.status(400).json({ error: 'Username or Email already exists' });
    }  

    if (!Password || typeof Password !== "string") {
        throw Error("Password is required");
    }

    // converting the plain password to something that looks random. This is called encryption
    const salt = await bcrypt.genSalt(10);
    console.log(Password);
    console.log(salt);
    const encrypted_password = await bcrypt.hash(Password, salt);

    // insert the user into the database. We are are storing the encrypted password, not the plain password
    const stmt = db.prepare(`INSERT INTO Users (Name, Username, Email, Password) VALUES (?, ?, ?, ?)`);
    await new Promise((resolve, reject) => {
      stmt.run(Name, Username, Email, encrypted_password, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve();
          }
          stmt.finalize();
      });
    });
    res.json({ success: 'User created.' });

    } catch (error) {
    // Handle errors
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'An error occurred during signup.' });
    }

    /*const sq3 = "SELECT Users.Id FROM Users WHERE Id = ?";
    db.get(sq3, Email, (err, row) => {
      if (err) {
          // Handle error
          console.error('Error executing query:', err);
          return;
      }
      const Id = row.Id;
      return res.json({id: Id});
      }); 
});

async function generateRefreshToken(user) {
    const refreshToken = await bcrypt.hash(user.id.toString(), 10); // Hash the user ID to create a refresh token
    // Store the refresh token in the database (associate it with the user ID)
    // Example: saveRefreshToken(user.id, refreshToken);
    return refreshToken;
  }

app.post('./login',(req, res) => {
    // retrieve information from the query parameters
    const {Username, Password} = req.body;
    const sql = 'SELECT * FROM Users WHERE Username = ?';
  
    db.get(sql, [Username], async (err, row) => {
      encrypted_password = row.Password
  
      password_res = await bcrypt.compare(Password, encrypted_password)
  
      if (password_res) {
          // if the password was correct, generate a JWT token and send it back to the user
          var token = jwt.sign({ id: row.id }, 'super_secret_key', { expiresIn: '1h' });
  
          return res.status(200).json({ message: "success", token: token, id: row.id})
      } else {
          return res.status(401).json({ error: 'Incorrect username or password.' });
      }
  
    });
  }); 


  app.get('/user', (req, res) => {
    // get the token
    const token = req.headers.token;
  
    // verify the token. This is where we check if the user is "logged in"
    let decoded;
    try {
      decoded = jwt.verify(token, "super_secret_key")
    } catch (error) {
      res.json({ error: "invalid token, please login again"})
    }
  
    // retrieve the user's data using the token
    const sql = 'SELECT Users.Id, Users.Name, Users.Email FROM Users WHERE Id = ?';
    db.get(sql, [decoded.id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(401).json({ error: 'Invalid token.' });
      }
      return res.json(row);
    });
  });
  */
  
import { createConnection } from "mysql";
import { HOST, USER, PASSWORD, DB } from "../app/config/db.config.js";

const connection = createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB
  });

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

export default connection;
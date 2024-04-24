import mysql2 from "mysql2";

export const dbConnection = mysql2.createPool({
  user: "trident",
  database: "evangadi-forum-db",
  host: "localhost",
  password: "trident",
  connectionLimit: 10,
});

export const dbConn = dbConnection.promise();

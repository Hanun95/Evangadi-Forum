import mysql2 from "mysql2";

const dbConnection = mysql2.createPool({
  user: "trident",
  database: "evangadi-forum-db",
  host: "localhost",
  password: "trident",
  connectionLimit: 10,
});

dbConnection.execute("SELECT 'trident' ", (err, results, fields) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(results);
  }
});

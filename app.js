import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import { dbConn } from "./db/dbConfig.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);

async function start() {
  try {
    const result = await dbConn.query("select 'trident' ");
    app.listen(5000);
    console.log("database connection established");
    console.log("Server is running on port 5000");
  } catch (error) {
    console.error(error.message);
  }
}
start();

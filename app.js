import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import questionRoute from "./routes/questionRoute.js";
import answerRoute from "./routes/answerRoute.js";
// import { dbConn } from "./db/dbConfig.js";
import mongoose from "mongoose";
const app = express();
mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("mongodb connected")
  
}).catch((error)=>{
console.log("error", error)
})


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.use("/api/questions", questionRoute);
app.use("/api/answers", answerRoute);


app.listen(5500, ()=>{
  console.log("connected")
})
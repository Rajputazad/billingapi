import express from "express";
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import Authuser from "./routes/Authuser.js"
import conndb from "./db/config.js"
conndb()
dotenv.config()
const PORT= process.env.PORT
const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(
    cors({
        origin: ["http://localhost:3006",],
        methods: ["GET", "POST", "PUT","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
// const Authuser = require("./routes/Authuser")(router)

  app.use("/",Authuser)

  app.listen(PORT,()=>{
    console.log(`url:http://localhost:${PORT}`)
    
  })
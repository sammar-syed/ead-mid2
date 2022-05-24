import express from "express";
import connectDB from "./dbs/connectdb.js"
import { join } from 'path';
import web from "./routers/web.js"
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
const app = express()


app.use(fileUpload());

// const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
// app.use(body_parser.json())

const port = process.env.PORT || '3003'
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

// Database Connection
connectDB(DATABASE_URL);

// app.use(body_parser.urlencoded({ extended: true }))

// Static Files
app.use("/student", express.static(join(process.cwd(), "public")))
app.use("/student/edit", express.static(join(process.cwd(), "public")))

// Set Template Engine

app.set("view engine", "ejs");

// Load Routes
app.use("/student", web)


app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})



export default connectDB;
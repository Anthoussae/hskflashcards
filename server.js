console.log("server functioning");
const dotenv = require("dotenv");
console.log("got this far");
const express = require("express");
dotenv.config();
const app = express();
app.use(express.static("public"));
const port = process.env.PORT;
app.listen(port,()=>console.log("listening"));

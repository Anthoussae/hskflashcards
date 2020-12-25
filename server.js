const dotenv = require("dotenv");
     const express = require("express");
     dotenv.config()
     const app = express();
     app.use(express.static("public"));
     const port = process.env.PORT;
     app.listen(port,()=>console.log("listening"));
     console.log("server functioning");

const express = require("express");
const {engine} = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// parsing middleware
//parse app in url form
app.use(bodyParser.urlencoded({extended: false}));

// app JSON
app.use(bodyParser.json());

// static files
app.use(express.static("public"));

// Template
app.engine("hbs", engine( {extname: ".hbs"}));
app.set("view engine","hbs");

//get route from defects js, this point to the index page
const routes = require("./server/routes/defects.js");

app.use("/", routes);

// sql con#
const pool = mysql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

pool.getConnection((err,con)=> {
    if(err) throw err;
    console.log("connected as ID" + con.threadId);
})

app.listen(port,() => console.log('Listening on port ' + port));
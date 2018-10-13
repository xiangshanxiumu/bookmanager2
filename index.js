/*图书管理入口文件*/
const express = require("express");
const bodyParser = require("body-parser");
var multer  = require("multer");
const router = require("./router.js");
const app = express();

app.use("/www",express.static("public"));

app.use(bodyParser.urlencoded({ extended: false}));//一定要写在路由之前

app.use(router);
//app.use(bodyParser());


//app.use(bodyParser.json());


app.listen(3000,()=>{
	console.log("app is running...")
});
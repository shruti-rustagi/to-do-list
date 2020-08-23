const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");
var items = ["Doing Exercise" , "Cook Food" , "Eat Food"];
var workItem = [];
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.use(express.static("public"));
app.get("/" , function ( req ,res){
	
	let day = date.getdate();

	res.render("list" , {listTitle : day , newListItem:items});
});
app.post("/" , function (req ,res){
	var item = req.body.newItem;
	if (req.body.list === "Work") {
		workItem.push(item);
	    res.redirect("/work")
	}
	else {
		items.push(item);
	 res.redirect("/");
	}
	 
});
app.get("/work" ,function(req , res){
	res.render("list" , {listTitle :"Work", newListItem:workItem});
});
app.get("/about" , function (req , res){
	res.render("about");
});
app.listen( 3000 , function () {
	console.log("Server is running at port 3000");
});

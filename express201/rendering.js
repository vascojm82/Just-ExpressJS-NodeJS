const path = require('path');
const helmet = require('helmet');
const express = require('express');
const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res, next) => {
  res.render("index");    //'index' is the name of the ejs template file to be rendered
});

app.listen(3000, function(){
  console.log("Server listening on Port 3000");
});

/***** Middleware load order explanation ****/
// Express loads middleware from top to bottom, left to right. In this case (lecture 21), app.use(express.static('public')) comes before:
//
// app.get('/',(req, res, next)=>{
//
// That means that anything in the public folder that matches a route, will trump any other matching route (the app.get). We have a file called
//index.html which the browser will always use at / (if there is one).
//
// If you move app.use(express.static('public')) to be after the app.get, you'll get the EJS load instead.
//
// In other words, if you have a file that you are serving statically and the static middleware comes first, it will always load instead of the
//route (index.html just happens to be unique in that it matches /). If you have the route first with the same name, it will load instead of the public file. For instance, you can put this before the app.use(static), and it will load instead of ajax.html:
//
// app.get('/ajax.html',(req, res, next)=>{
//     res.send("Got ya!")
// })
// As a general rule, I always put my public folder first, and never overlap filenames... even though I know how it works, it's confusing :)
/*****************************************/

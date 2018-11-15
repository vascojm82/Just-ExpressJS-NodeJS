const path = require('path');
const express = require('express');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

app.use((req, res, next) => {
  if(req.query.msg === 'fail'){
    res.locals.msg = 'Sorry. This username and password combination does not exist.';
  }else{
    res.locals.msg = '';
  }

  //Send me to the next piece of middleware
  next();
});

app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//app.param() - takes 2 args:
// 1. param to look for in the route
// 2. the callback to run (with the usuals)
app.param('id', (req, res, next, id) => {
  console.log(`Params called: ${id}`);

  next();
});

// app.get('user/:uid', ...)
// app.get('user/admin/:uid', ...)
// app.get('user/profile/:uid', ...)

app.get('/', (req, res, next) => {
  res.send("Sanity Check");
});

app.get('/login', (req, res, next) => {
  // the req object has a query property in express req.query is
  // an object, with a property of every key in the query string
  //console.log(req.query);
  res.render("login");
});

app.get('/welcome', (req, res, next) => {
  //req.cookies object will have a property for every named cookie that has been set.
  res.render("welcome", {
    username: req.cookies.username
  });
});

app.get('/story/:id', (req, res, next) => {
  res.send(`<h1>story ${req.params.id}</h1>`);
});

app.get('/story/:storyId/:link', (req, res, next) => {
  res.send(`<h1>story ${req.params.storyId} - ${req.params.link}</h1>`);
});

app.post('/process_login', (req, res, next) => {
  //req.body is made by urlencoded, which parses the http message for sent data
  const password = req.body.password;
  const username = req.body.username;
  //Check the db to see if user credentials are valid
  //if they are valid...
    // - save their username in a cookie
    // - is send them to the welcome page

  if(password === "x"){
    res.cookie("username", username);
    res.redirect("/welcome");   //Send to Welcome page
  }else{
    // The "?" is a special character in a URL
    res.redirect("/login?msg=fail&test=hello");
  }
});

app.get('/statement', (req, res, next) => {
  //This will render the statement IN the browsers, no 'content-disposition' HTML header to download the file as an attachment
  //res.sendFile(path.join(__dirname, 'userStatements/BankStatementChequing.png'));

  // res.download will set the HTML header: 'content-disposition = attachment; filename="JosesStatement.png"'
  // , in order to download the file.  HTML header: "content-type = image/png" will be the same as with 'res.sendFile();'

  let user = "Jose's";                                                                                    //Error callback
  res.download(path.join(__dirname, 'userStatements/BankStatementChequing.png'), `${user}Statement.png`, (error) => { console.log(error);});
                                                                                  //Optional new name for the file

  // res.download() does the HTML header for the attachment then calls res.sendFile();
  // res.attachment() only sets the HTML header for the attachment file(s)
  //res.attachment(path.join(__dirname, 'userStatements/BankStatementChequing.png'), `${user}Statement.png`);

  // 'res.headersSent' boolean flag, checks if HTML headers have already been sent, HTML headers can ONLY be sent once
  // So, inside the error callback for res.download(), you CAN'T DO THIS:
  // if (error) {
  //   // res.redirect('/download/error');   //Will give an error since HTML headers were already sent when res.download() was called
  // }
});

app.get('/logout', (req, res, next) => {
  res.clearCookie('username');
  res.redirect('/login');
});

app.listen(3000, function(){
  console.log("Server listening on port 3000.")
});

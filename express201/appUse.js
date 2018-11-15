const express = require('express');
const app = express();

// Express = 2 things
// 1. Router
// 2. Middleware that comprises a webframework
//
// Req ---> MIDDLEWARE ---> Res
// Middleware function is ANY function that has access to the req, res, next objects
            //  Function below is Middleware
            //       ||   , b/c it has access to the req, res & next objects
app.get('/', (req, res, next) => {
  res.send("<h1>Main Page</h1>");
});
// Middleware callback above doesn't get affected by validateUser below as it was declared before

/************ Middleware Injection examples **********/

//Example Custom Middleware Function
function validateUser(req, res, next){
    //get info out of the req object
    //do some stuff with the DB

    //res.locals, An object that contains response local variables scoped to the
    //request, and therefore available only to the view(s) rendered during that
    //request / response cycle (if any).  res.locals variables are valid only
    //for the lifetime of the request.
    //This property is useful for exposing request-level information such as the
    //request path name, authenticated user, user settings, and so on.
    res.locals.validated = true;
    console.log("Validated Ran!");
    console.log(res.locals);
    next();   //Hand over control to the next middleware piece in the cycle
              //If next() is not called the process/cycle ends there, meaning
              //No other piece of middleware will run
}

app.use(validateUser);    //With this, 'validateUser' middleware runs all the time at the application level
                          //meaning, every time there's an http request it gets called automatically
                          //on every route (request/response cycle) except with the '/admin' route which has its own
                          //specific middleware and therefore a different scoped request/response lifecycle than all
                          //the other routes, all other routes other than '/admin' work on the scoped lifecyle for the
                          //'validateUser' middleware.

//The callback down here will be the next piece of middleware to run in the general scoped cycle continued by next() above
//in 'validateUser' and it's still within the same request/response lifecycle
app.get('/test', (req, res, next) => {
  res.send("<h1>Just a Test Page</h1>");
});
//After middleware callback above has ran, request/response lifecycle ends. (because there's no next() call)

//Another Example Custom Middleware Function
function validateUser2(req, res, next){
    //get info out of the req object
    //do some stuff with the DB for the Admin Page

    res.locals.validated = 'YOU"RE THE ADMIN';
    console.log("This Middleware runs ONLY for the /admin route");
    console.log(res.locals);
    next();   //Hand over control to the next middleware piece in the cycle
              //If next() is not called the process/cycle ends there, meaning
              //No other piece of middleware will run
}

app.use('/admin', validateUser2);   //validateUser2 middleware function runs only on the /admin route below

//The callback down here will be the next piece of middleware to run in this scoped cycle continued by next() above
//in 'validateUser2' and it's still within the same request/response lifecycle
app.get('/admin', (req, res, next) => {
  res.send("<h1>Admin Page</h1>");
});
//After middleware callback above has ran, request/response lifecycle ends. (because there's no next() call)

/************************************************************************************************************/

//All of the above code will be the same as doing:
app.get('/', validateUser2);

//OR

app.get('/admin', validateUser2);
//Because the same as a callback inside 'app.get()', 'validateUser' & 'validateUser2'
//are Middleware as well, meaning they have access to the req, res & next objects and could
//be used directly to do everything, including the res.send() part at the end of the get request.
//In which manner Middleware gets used depends on a case by case basis, whether it's injecting it
//automatically on every route like at the beginning or doing so manually, directly as a callback
//to each route (GET,POST,PUT,etc..).


/****** FURTHER CLARIFICATION ************/
// This will run validateUser on ALL paths(routes), all methods (GET,POST,PUT,DELETE)
// app.use(validateUser);
//
// This will run validateUser2 on the '/admin' route, all methods (GET,POST,PUT,DELETE)
// app.use('/admin' validateUser2);
//
// This will run validateUser on '/', ONLY ON THE GET methods
// app.get('/' validateUser);
//
//And the last one above would look the same as doing this:
//app.get('/' (req, res, next) => {
//   res.locals.validated = true;
//   console.log("Validated Ran!");
//   console.log(res.locals);
//   res.send("<h1>Maybe the Main Page</h1>");
//});
//
//So, app.get() is just another way of writing middleware

app.listen(3000);
console.log("Server listening on port 3000");

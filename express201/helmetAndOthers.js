const express = require('express');
const app = express();
const CircularJSON = require('circular-json');
const helmet = require('helmet');

// req.ip  //Contains requester's IP

app.use(helmet());    //Prevents hacks, injection on HTTP headers
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/ajax', (req, res) => {
  console.log("Request Object: " + CircularJSON.stringify(req.body));
  res.json("Test");   //Response is sent in JSON format, Jquery promise on the
                      //frontend expects this format as it was told to use JSON
});
app.listen(3000);
console.log("Server listening on port 3000");

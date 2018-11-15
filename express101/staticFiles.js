const path = require("path");         //Native modules first declared
const express = require('express');
const app = express();


app.use(express.static('public'));    //Gives access to all front-end static content outside of any route below

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/node.html"));    //Routes require the full path to the file even if
});                                                           //the file is in the Public folder being served above

app.listen(3000);
console.log("Server listening on port 3000")

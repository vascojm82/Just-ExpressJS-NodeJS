const express = require('express');
const app = express();

app.all('*', (req, res) => {
  res.send(`<h1>This is the Homepage</h1>`);
});

app.listen(3000);
console.log("Server is listening on port 3000");

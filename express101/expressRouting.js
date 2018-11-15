const express = require('express');
const app = express();

// app.all('/', (req, res) => {
//   res.send("<h1>Wecome to the Homepage</h1>");
// });

app.get('/', (req, res) => {
  res.send("<h1>Wecome to the Home GET page</h1>");
});
app.post('/', (req, res) => {
  res.send("<h1>Wecome to the Home POST page</h1>");
});
app.delete('/', (req, res) => {
  res.send("<h1>Wecome to the Home DELETE page</h1>");
});
app.put('/', (req, res) => {
  res.send("<h1>Wecome to the Home PUT page</h1>");
});

app.listen(3000);
console.log('Server Listening on port 3000');

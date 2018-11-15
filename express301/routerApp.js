const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));

//Router declaration needs to be down here so all middleware above applies to the Router too.
const router = require('./theRouter');
const userRouter = require('./userRouter');
app.use('/',router);
app.use('/user',userRouter);


app.listen(3000, function() {
  console.log("Server listening on Port 3000");
})

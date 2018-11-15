const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(`A req has been made to: ${req.url}`);
  if(req.url === '/'){
    res.writeHead(200,{'content-type':'text/html'});  //Got the client's request, replying 200
    let homePageHTML = fs.readFileSync('node.html');  //Store file into a buffer
    res.write(homePageHTML);
    res.end();
  }else if(req.url === '/styles.css'){
    res.writeHead(200,{'content-type':'text/css'});  //Got the client's request, replying 200
    let styleSheet = fs.readFileSync('styles.css');  //Store file into a buffer
    res.write(styleSheet);
    res.end();
  }else if(req.url === "/logo.svg"){
    res.writeHead(200,{'content-type':'image/svg+xml'});  //Got the client's request, replying 200
    const image = fs.readFileSync('logo.svg');
    res.write(image);
    res.end();
  }else if(req.url === '/abc'){
    res.writeHead(200,{'content-type':'text/html'});  //Got the client's request, replying 200
    res.write('<h1>Route1</h1>');
    res.end();
  }else{
    res.writeHead(400,{'content-type':'text/html'});  //Got the client's request, replying 200
    res.write('<h1>Error, Page doesnt exist</h1>');
    res.end();
  }
});

server.listen(3000);

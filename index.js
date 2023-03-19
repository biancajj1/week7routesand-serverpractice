//import http
import http from "http";
import fetch from "node-fetch";
import { createDeflateRaw } from "zlib";
//create server with http

const server = http.createServer((req, res) => {
  const url = req.url;
  let tableData =
    "<table border='1'><tr><th>ID</th><th>Name</th><th>Username</th><th>Email</th><th>Address</th><th>Phone Number</th></tr>";

  if (url === "/") {
    res.write("<h1>Home page</h1>");
    res.end(`<img src="https://dummyimage.com/600x400/c736c7/4148ab.png&text=Here+is+a+dummy+image">`);
  }

  if (url === "/message") {
    res.write("welcome to my message page");
    res.end();
  }

  if (url === "/list") {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        createData(data);
        res.write(tableData);
        res.end();
      });
  }

  function createData(data) {
    data.forEach(element => {

        tableData += `<tr><td>${element.id}</td><td>${element.name}</td><td>${element.username}</td><td>${element.email}</td><td>${element.address.street}</td><td>${element.phone}</td></tr>`
        
    });
    tableData += `</table>`
  }
});

//port server

const PORT = 4000;
//listen to server

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

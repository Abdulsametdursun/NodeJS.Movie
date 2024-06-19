const http = require("http");
const getRequest = require("./methods/get");
const postRequest = require("./methods/post");
const deleteRequest = require("./methods/delete");

// 1) Create the server
const server = http.createServer((req, res) => {
  // Header that will be added to all answers to be sent to the frontend and will prevent cors errors
  res.setHeader("Access-Control-Allow-Origin", "*");

  // A function that responds to the requested method type
  switch (req.method) {
    //When a post/put/patch/delete request is made from the
    //frontend, the browser first sends a request with the
    //options method to check whether the server accepts these
    //request types. If an options request comes, if we respond
    //with the correct headers, the actual request is sent after
    // the options.
    case "OPTIONS":
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS, PATCH"
      );
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.end();
      break;

    case "GET":
      getRequest(req, res);
      break;

    case "POST":
      postRequest(req, res);
      break;

    case "DELETE":
      deleteRequest(req, res);
      break;

    default:
      // determine the status code of the response
      res.statusCode = 404;

      // add headers to the response according to the status code
      res.setHeader("Content-Type", "application/json");

      // determine the content of the answer
      res.write(
        JSON.stringify({
          message: "Method not found",
        })
      );
      // Send a response
      res.end();
  }
});

// 2) Create the request handler
const port = 5005;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

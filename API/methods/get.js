const fs = require("fs");

/*
 * If the request from the client:
 * send all movies from "/api/movies"
 * send only the one with valid id from "/api/movies/:id"
 */

module.exports = async (req, res) => {
  // address of the request
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));

  // send variables of the id
  const id = req.url.split("/")[3];

  if (req.url === "/api/movies") {
    // 1) Code of status
    res.statusCode = 200;

    // 2) Headers of the response
    res.setHeader("Content-Type", "application/json");

    // 3) get all movies from json
    const movies = fs.readFileSync("./data/movies.json", "utf-8");

    // 4) send answer to the client
    return res.end(movies);
  } else if (baseUrl === "/api/movies" && id) {
    // 1) Get all movies (javascript)
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    // 2) Get one movie by id
    const movie = data.movies.find((movie) => movie.id === id);

    if (movie) {
      // 3) if one movie is found, send it to the client
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(movie));
    } else {
      // 4) if one movie is not found, send status 404
      return res.end("Not Found");
    }
  } else {
    res.statusCode = 404;
    return res.end("Not Found");
  }
};

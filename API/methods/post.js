const bodyParser = require("../utils/bodyParser");
const crypto = require("crypto");
const fs = require("fs");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      // Get request body
      const body = await bodyParser(req);

      // Check if the request body is empty
      if (
        !body.title ||
        !body.year ||
        !body.rating ||
        !body.genre ||
        !body.genre.length > 0
      ) {
        res.writeHead(400);
        res.end("Please, Fill all fields");
        return;
      }
      // Add id to the request body
      body.id = crypto.randomUUID();

      // Get all files from json file
      let data = fs.readFileSync("./data/movies.json", "utf-8");
      data = JSON.parse(data);

      // Add new movie to the json file
      data.movies.push(body);

      // update the json file
      fs.writeFileSync("./data/movies.json", JSON.stringify(data));

      // send answer to the frontend
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(body));
    } catch (error) {
      return res.end("There is an Error");
    }
  } else {
    res.end("Path is Not Found");
  }
};

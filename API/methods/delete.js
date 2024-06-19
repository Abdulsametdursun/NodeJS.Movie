const fs = require("fs");

module.exports = async (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));

  const id = req.url.split("/")[3];

  if (baseUrl === "/api/movies" && id) {
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf8"));

    const isFound = data.movies.find((i) => i.id == id);
    if (!isFound) {
      res.writeHead(404);
      return res.end("ID is not found");
    }

    const filtered = data.movies.filter((item) => item.id !== id);

    fs.writeFileSync(
      "./data/movies.json",
      JSON.stringify({ movies: filtered })
    );

    res.writeHead(204, { "Content-Type": "application/json" });
    return res.end();
  } else {
    res.writeHead(404);
    return res.end("ID is not found");
  }
};

const express = require("express");
const db = require("./data/db");

const server = express();

server.get("/api/posts", (req, res) => {
  db.find()
    .then(data => {
      // console.log(data)
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        sucess: false,
        error: "The posts information could not be retrieved."
      });
    });
});

server.listen(6000, () => {
  console.log("\n*** Server Running on http://localhost:6000 ***\n");
});

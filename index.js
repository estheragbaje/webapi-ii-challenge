const express = require("express");
const db = require("./data/db");

const server = express();

server.get('/api/posts', (req, res) => {
    db.find()
})

server.listen(6000, () => {
    console.log('\n*** Server Running on http://localhost:6000 ***\n');
  });
  
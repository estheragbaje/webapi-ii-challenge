const express = require("express");
const db = require("./data/db");

const server = express();
server.use(express.json());

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

server.post("/api/posts", (req, res) => {
  //   const newPost = {
  //     title: req.body.title,
  //     contents: req.body.contents
  //   };

  db.insert(req.body)
    .then(data => {
      if (data) {
        res.status(201).json(data);
      } else {
        res.status(400).json({
          success: false,
          errorMessage: "Please provide title and contents for the post."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

//Creates a comment for the post with the specified
//id using information sent inside of the request body.
server.post("/api/posts/:id/comments", (req, res) => {
  const comment = {
    post_id: req.params.id,
    text: req.body.text
  };

  db.insertComment(comment)
    .then(data => {
      if (data) {
        res.status(201).json(data);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

server.get("/api/posts/:id/comments", (req, res) => {
  db.findCommentById(req.params.id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The comments information could not be retrieved."
      });
    });
});

server.get("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)

    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end;
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        error: "The post could not be removed"
      });
    });
});

server.listen(6000, () => {
  console.log("\n*** Server Running on http://localhost:6000 ***\n");
});

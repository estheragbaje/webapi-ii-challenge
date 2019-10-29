const express = require("express");
// const db = require("./data/db");
const db = require("./db.js");
const router = express.Router();

router.get("/", (req, res) => {
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

router.post("/", (req, res) => {
  const post = {
    title: req.body.title,
    contents: req.body.contents
  };

  db.insert(post)
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
router.post("/:id/comments", (req, res) => {
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

router.get("/:id/comments", (req, res) => {
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

router.get("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
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

router.put("/:id", (req, res) => {
  const changes = req.body;
  changes.id = req.params.id;

  db.update(req.params.id, changes, changes.id)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified."
      });
    });
});

module.exports = router;

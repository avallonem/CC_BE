const db = require("../models");
const Asset = db.assets;

// Create and Save a new asset
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
   if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a asset
    const asset = new Asset({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });
 
    // Save asset in the database
    asset
      .save(asset)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the asset."
        });
      });
  };

// Retrieve all assets from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Asset.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving assets."
        });
      });
  };

// Find a single asset with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Asset.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found asset with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving asset with id=" + id });
      });
  };

// Update a asset by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Asset.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update asset with id=${id}. Maybe asset was not found!`
          });
        } else res.send({ message: "asset was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating asset with id=" + id
        });
      });
  };

// Delete a asset with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Asset.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete asset with id=${id}. Maybe asset was not found!`
          });
        } else {
          res.send({
            message: "asset was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete asset with id=" + id
        });
      });
  };

// Delete all assets from the database.
exports.deleteAll = (req, res) => {
    Asset.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} assets were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all assets."
        });
      });
  };
// Find all published assets
exports.findAllPublished = (req, res) => {
    Asset.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving assets."
        });
      });
  };
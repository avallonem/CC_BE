const db = require("../models");
const Transaction = db.transactions;

// Create and Save a new transaction
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
   if (!req.body.description) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a transaction
    const transaction = new Transaction({
      from_address: req.body.from_address,
      from_name: req.body.from_name,
      to_address: req.body.to_address,
      to_name: req.body.to_name,
      description: req.body.description,
      date: req.body.date,
      amount: req.body.amount

    });
 
    // Save transaction in the database
    transaction
      .save(transaction)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the transaction."
        });
      });
  };

// Retrieve all transactions from the database.
exports.findAll = (req, res) => {
    const from_name = req.query.from_name;
    var condition = from_name ? { from_name: { $regex: new RegExp(from_name), $options: "i" } } : {};
  
    Transaction.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving transactions."
        });
      });
  };

// Find a single transaction with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Transaction.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found transaction with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving transaction with id=" + id });
      });
  };

// Update a transaction by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Transaction.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update transaction with id=${id}. Maybe transaction was not found!`
          });
        } else res.send({ message: "transaction was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating transaction with id=" + id
        });
      });
  };

// Delete a transaction with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Transaction.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete transaction with id=${id}. Maybe transaction was not found!`
          });
        } else {
          res.send({
            message: "transaction was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete transaction with id=" + id
        });
      });
  };

// Delete all transactions from the database.
exports.deleteAll = (req, res) => {
    Transaction.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} transactions were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all transactions."
        });
      });
  };
// Find all published transactions
exports.findByTo = (req, res) => {
    const to_name = req.query.to_name;
    var condition = to_name ? { to_name: { $regex: new RegExp(to_name), $options: "i" } } : {};
  
    Transaction.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving transactions."
        });
      });
  };

 
const db = require("../models");
const Customer = db.customers;

// Create and Save a new customer
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
   if (!req.body.given_name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a customer
    const customer = new Customer({
      given_name: req.body.given_name,
      family_name: req.body.family_name,
      fiscal_number: req.body.fiscal_number,
      date_of_birth: req.body.data_of_birth,
      contry_of_birth: req.body.country_of_birth,
      place_of_birth: req.body.place_of_birth,
      gender: req.body.gender,
      email_address: req.body.email_address,
      mobile_phone: req.body.mobile_phone,
      profession: req.body.profession,
      risk_type: req.body.risk_type,
      asset_title: req.body.asset_title,
      asset_description: req.body.asset_description,
      asset_value: req.body.asset_value

    });
 
    // Save customer in the database
    customer
      .save(customer)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the customer."
        });
      });
  };

// Retrieve all customers from the database.
exports.findAll = (req, res) => {
    const family_name = req.query.family_name;
    var condition = family_name ? { family_name: { $regex: new RegExp(family_name), $options: "i" } } : {};
  
    Customer.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      });
  };

// Find a single customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Customer.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found customer with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving customer with id=" + id });
      });
  };

// Update a customer by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update customer with id=${id}. Maybe customer was not found!`
          });
        } else res.send({ message: "customer was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating customer with id=" + id
        });
      });
  };

// Delete a customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Customer.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete customer with id=${id}. Maybe customer was not found!`
          });
        } else {
          res.send({
            message: "customer was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete customer with id=" + id
        });
      });
  };

// Delete all customers from the database.
exports.deleteAll = (req, res) => {
    Customer.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} customers were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      });
  };
// Find all published customers
exports.findAllPublished = (req, res) => {
    Customer.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      });
  };
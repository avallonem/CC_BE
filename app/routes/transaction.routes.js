module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
  
    var router = require("express").Router();
  
    // Create a new customer
    router.post("/", transactions.create);
  
    // Retrieve all transactions
    router.get("/", transactions.findAll);
  
    // Retrieve all published transactions
    router.get("/published", transactions.findAllPublished);
  
    // Retrieve a single customer with id
    router.get("/:id", transactions.findOne);
  
    // Update a customer with id
    router.put("/:id", transactions.update);
  
    // Delete a customer with id
    router.delete("/:id", transactions.delete);
  
    // Create a new customer
    router.delete("/", transactions.deleteAll);
  
    app.use('/api/transactions', router);
  };
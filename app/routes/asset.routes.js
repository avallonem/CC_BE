module.exports = app => {
  const assets = require("../controllers/asset.controller.js");

  var router = require("express").Router();

  // Create a new asset
  router.post("/", assets.create);

  // Retrieve all assets
  router.get("/", assets.findAll);

  // Retrieve all published assets
  router.get("/published", assets.findAllPublished);

  // Retrieve a single asset with id
  router.get("/:id", assets.findOne);

  // Update a asset with id
  router.put("/:id", assets.update);

  // Delete a asset with id
  router.delete("/:id", assets.delete);

  // Create a new asset
  router.delete("/", assets.deleteAll);

  app.use('/api/assets', router);
};
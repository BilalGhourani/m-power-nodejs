module.exports = app => {
    const services = require("../controllers/ServiceController.js");

    var router = require("express").Router();

    // Create a new Services
    router.post("/create", services.create);

    // Retrieve all Services
    router.get("/getAllServices", services.findAll);

    // Retrieve last Services with first and second plate number
    router.get("/search", services.lastServiceWithPlateNum);

    // Retrieve a single Services with id
    router.get("/:id", services.findOne);


    app.use('/api/services', router);
};

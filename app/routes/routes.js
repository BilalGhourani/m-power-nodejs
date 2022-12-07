module.exports = app => {
    const invoices = require("../controllers/ServiceController.js");

    var router = require("express").Router();

    // Create a new Services
    router.post("/create", invoices.create);

    // Retrieve all Servicess
    router.get("/getAllServices", invoices.findAll);

    // Retrieve last Services with first and second plate number
    router.get("/search", invoices.lastServiceWithPlateNum);

    // Retrieve a single Services with id
    router.get("/:id", invoices.findOne);


    app.use('/api/services', router);
};

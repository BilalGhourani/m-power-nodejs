module.exports = app => {
    const invoices = require("../controllers/carController.js");

    var router = require("express").Router();

    // Create a new Invoice
    router.post("/create", invoices.create);

    // Retrieve all Invoices
    router.get("/getAllInvoices", invoices.findAll);

    // Retrieve last Invoice with first and second plate number
    router.get("/search", invoices.lastCarWithPlateNum);

    // Retrieve a single Invoice with id
    router.get("/:id", invoices.findOne);

    /*  // Update a Invoice with id
      router.put("/:id", invoices.update);

      // Delete a Invoice with id
      router.delete("/:id", invoices.delete);

      // Delete all Invoices
      router.delete("/", invoices.deleteAll);*/

    app.use('/api/invoices', router);
};

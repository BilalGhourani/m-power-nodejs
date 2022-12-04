const Car = require("../models/carModel.js");

// Create and Save a new Car
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Car
    const car = new Car({
        title: req.body.title,
        description: req.body.description,
        firstPlateNumber: req.body.firstPlateNumber,
        secondPlateNumber: req.body.secondPlateNumber
    });

    // Save Car in the database
    Car.create(Car, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Cars."
            });
        else res.send(data);
    });
};

// Retrieve all Cars from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.body.id;

    Car.getAll(id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Cars."
            });
        else res.send(data);
    });
};

exports.lastCarWithPlateNum = (req, res) => {
    var plateFirstNumber = req.query.firstPlateNumber;
    var plateSecondNumber = req.query.secondPlateNumber;
    if (!plateFirstNumber) {
        plateFirstNumber = req.body.firstPlateNumber;
    }
    if (!plateSecondNumber) {
        plateSecondNumber = req.body.secondPlateNumber;
    }
    if (!plateFirstNumber) {
        res.status(500).send({
            message: "first plate number is missing!"
        });
        return;
    }

    if (!plateSecondNumber) {
        res.status(500).send({
            message: "second plate number is missing!"
        });
        return;
    }

    Car.lastCarWithPlateNum(plateFirstNumber, plateSecondNumber, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Cars."
            });
        else res.send(data);
    });
};

// Find a single Car by Id
exports.findOne = (req, res) => {
    car.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Car with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Cars with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


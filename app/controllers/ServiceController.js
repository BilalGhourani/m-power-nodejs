const Service = require("../models/ServiceModel.js");

// Create and Save a new Service
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Service
    const service = new Service({
        name: req.body.name,// BMW
        type: req.body.type,// X6
        color: req.body.color,// Brown
        model: req.body.model,// 2016
        plateFirstNumber: req.body.plateFirstNumber,// 81
        plateSecondNumber: req.body.plateSecondNumber,// 123456
        currentKM: req.body.currentKM,// 650000
        nextKM: req.body.nextKM,// 655000
        dateOfChanges: req.body.dateOfChanges,// 14/07/2022
        username: req.body.username,// taha hamdan
        phone: req.body.phone,// 96561233132
        chassis_number: req.body.chassis_number,// 123731822
    });

    // Save Service in the database
    Service.create(service, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Services."
            });
        else res.send(data);
    });
};

// Retrieve all Services from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.body.id;

    Service.getAll(id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Services."
            });
        else res.send(data);
    });
};

exports.lastServiceWithPlateNum = (req, res) => {
    let plateFirstNumber = req.query.firstPlateNumber;
    let plateSecondNumber = req.query.secondPlateNumber;
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

    Service.lastServiceWithPlateNum(plateFirstNumber, plateSecondNumber, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Services."
            });
        else res.send(data);
    });
};

// Find a single Service by Id
exports.findOne = (req, res) => {
    Service.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Service with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Services with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


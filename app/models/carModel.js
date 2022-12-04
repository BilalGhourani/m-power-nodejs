const sql = require("./db.js");

// constructor
const Car = function (car) {
    this.name = car.name;
    this.type = car.type;
    this.color = car.color;
    this.model = car.model;
    this.firstPlateNumber = car.firstPlateNumber;
    this.secondPlateNumber = car.secondPlateNumber;
    this.currentKM = car.currentKM;
    this.nextKM = car.nextKM;
    this.dateOfChanges = car.dateOfChanges;
    this.username = car.username;
    this.phone = car.phone;
    this.chassis_number = car.chassis_number;
};

Car.create = (newCar, result) => {
    sql.query("INSERT INTO cars SET ?", newCar, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created car: ", {id: res.insertId, ...newCar});
        result(null, {id: res.insertId, ...newCar});
    });
};

Car.findById = (id, result) => {
    sql.query(`SELECT * FROM cars WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found car: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found car with the id
        result({kind: "not_found"}, null);
    });
};

Car.getAll = (id, result) => {
    let query = "SELECT * FROM cars";

    if (id) {
        query += ` WHERE id = ${id}`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("cars: ", res);
        result(null, res);
    });
};

Car.lastCarWithPlateNum = (plateFirstNumber, plateSecondNumber, result) => {
    if (!plateFirstNumber || !plateSecondNumber) {
        result({kind: "missing_data"}, -1);
        return
    }
    let query = `SELECT * FROM cars  WHERE plateFirstNumber LIKE '${plateFirstNumber}' and plateSecondNumber LIKE '${plateSecondNumber}'   ORDER BY id DESC LIMIT 1`;
    console.log("cars query: ", query);

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("cars: ", res);
        result(null, res);
    });
};



module.exports = Car;

const sql = require("./db.js");

// constructor
const Service = function (service) {
    this.name = service.name;
    this.type = service.type;
    this.color = service.color;
    this.model = service.model;
    this.firstPlateNumber = service.firstPlateNumber;
    this.secondPlateNumber = service.secondPlateNumber;
    this.currentKM = service.currentKM;
    this.nextKM = service.nextKM;
    this.dateOfChanges = service.dateOfChanges;
    this.username = service.username;
    this.phone = service.phone;
    this.chassis_number = service.chassis_number;
};

Service.create = (newService, result) => {
    sql.query("INSERT INTO service SET ?", Service, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Service: ", {id: res.insertId, ...newService});
        result(null, {id: res.insertId, ...newService});
    });
};

Service.findById = (id, result) => {
    sql.query(`SELECT *
               FROM service
               WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found service: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found service with the id
        result({kind: "not_found"}, null);
    });
};

Service.getAll = (id, result) => {
    let query = "SELECT * FROM service";

    if (id) {
        query += ` WHERE id = ${id}`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("services: ", res);
        result(null, res);
    });
};

Service.lastServiceWithPlateNum = (plateFirstNumber, plateSecondNumber, result) => {
    if (!plateFirstNumber || !plateSecondNumber) {
        result({kind: "missing_data"}, -1);
        return
    }
    let query = `SELECT *
                 FROM service
                 WHERE plateFirstNumber LIKE '${plateFirstNumber}'
                   and plateSecondNumber LIKE '${plateSecondNumber}'
                 ORDER BY id DESC LIMIT 1`;
    console.log("service query: ", query);

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("services: ", res);
        result(null, res);
    });
};


module.exports = Service;

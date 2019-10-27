const sets = require('./config');
const fs = require('fs');

/*-------------------BD PROCESS------------------*/
var ibmdb = require('ibm_db');

//FOR SELECT
let sql_job = async (query) => {
    return new Promise(function (fulfill, reject) {
        //ibmdb.open(`DATABASE=BLUDB;HOSTNAME=${dashdb};UID=${user};PWD=${pass};PORT=50000;PROTOCOL=TCPIP`, (err, conn) => {
        ibmdb.open(`DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=qct82975;PWD=9d878f9hrdmt@b9g;`, (err, conn) => {
            if (err) {
                console.log(err);
            } else {
                conn.query(query, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (data) {
                            let index = [];
                            let rows = [];
                            let row = [];
                            // build the index
                            for (let x in data[0]) {
                                index.push(x);
                            }
                            for (let r = 0; r < data.length; r++) {
                                for (let c = 0; c < index.length; c++) {
                                    row.push(data[r][index[c]]);
                                }
                                rows.push(row);
                                row = [];
                            }
                            let resp = {
                                results: [{
                                    columns: index,
                                    rows: rows,
                                    error: ''
                                }],
                                status: 'completed'
                            };
                            fulfill(resp);
                        } else {
                            let resp = {
                                results: [{
                                    columns: [],
                                    rows: [],
                                    error: 'No data'
                                }],
                                status: 'completed'
                            };
                            fulfill(resp);
                        }
                    }
                    conn.close(function () { }); ///conexion close
                }); //query conexion
            } //else
        }); ///open db
    }); ///promise
};
/*-------------------BD PROCESS------------------*/

/*-------------------BD QUERYS------------------*/
let getAlmacen = async () => {
    let query = `
    SELECT 
	*
FROM QCT82975.ALMACEN;`;
    let resp = await sql_job(query);
    if (resp.results.length === 0) {
        let respon = {
            status: "Failed",
            data: {},
            msg: "Empty Data"
        };
        return respon;
    }
    if (resp.results[0].error === "") {
        let respon = {
            status: "Successful",
            data: resp.results[0],
            msg: "OK"
        };
        return respon;
    } else {
        let respon = {
            status: "error",
            data: resp.results[0],
            msg: "resp.error: " + resp.error
        }
        return respon;
    }
}; //end query get sites
/*-------------------BD QUERYS------------------*/

module.exports = {
    getAlmacen
}
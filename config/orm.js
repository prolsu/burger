const connection = require('./connection.js');

function printQuestionMarks(count) {
    const questionMarks = [];
    for (let i = 0; i < count; i++) {
        questionMarks.push('?');
    }
    return questionMarks.toString();
};

function objectToSql(ob) {
    const arr = [];

    for (var key in ob) {
        let value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if(typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = `'${value}'`;
            };
            arr.push(`${key}=${value}`);
        }
    }

    return arr.toString();
};

const orm = {
    selectAll: function (tableInput, cb) {
        const queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, function(err, result) {
            if (err) throw err;

            cb(result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        let queryString = `INSERT INTO ${table}`;
        let cols = cols.toString();

        queryString += ` (${cols}) VALUES (${printQuestionMarks(vals.length)})`; 

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;

            cb(result);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        const queryString = `UPDATE ${table}`;

        queryString += `SET ${objectToSql(objColVals)} WHERE ${condition}`;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;

            cb(result);
        });
    }
};

module.exports = orm;
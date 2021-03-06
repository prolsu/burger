const express = require('express');
const burger = require('../models/burger.js');
const router = express.Router();

router.get('/', function(req, res) {
    burger.selectAll(function(data) {
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
        // res.send(true);//for testing only.. uncomment above line later
    });
});

router.post('/api/burgers', function(req, res) {
    const burgerName = req.body.burger_name;

    if (burgerName.length < 21 && burgerName.length != 0) {
        burger.insertOne(['burger_name', 'devoured'], [burgerName, req.body.devoured],
            function (result) {
                res.json({ id: result.insertId });
            });
    } else {
        console.log(`Burger name exeeds character or box is empty`)
    }
});

router.put('/api/burgers/:id', function(req, res) {
    const condition = `id = ${req.params.id}`;
    console.log(`Condition: ${condition}`);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete('/api/burgers/:id', function(req, res) {
    const condition = `id=${req.params.id}`;

    burger.deleteOne(condition, function(result) {
        if(result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;
var express = require("express");
var router = express.Router();

var formula = {
    celsius: {
        fahrenheit: '(input * 9 / 5)  + 32',
        kelvin: 'input + 273.15',
        rankine: '(input * 9 / 5)  + 491.67',
    },
    fahrenheit: {
        celsius: '(input - 32) * 5 / 9',
        kelvin: '(input - 32) * 5 / 9 + 273.15',
        rankine: 'input + 459.67',
    },
    kelvin: {
        celsius: 'input - 273.15',
        fahrenheit: '(input - 273.15) * 9 / 5 + 32',
        rankine: 'input * 9 / 5',
    },
    rankine: {
        celsius: '(input - 491.67) * 5 / 9',
        fahrenheit: 'input - 459.67',
        kelvin: 'input * 5 / 9',
    },
    litres: {
        tablespoons: 'input * 67.628',
        cubicinches: 'input * 61.024',
        cups: 'input * 4.167',
        cubicfeet: 'input / 28.317',
        gallons: 'input / 4.546',
    },
    tablespoons: {
        litres: 'input / 67.628',
        cubicinches: 'input / 1.108',
        cups: 'input / 16.231',
        cubicfeet: 'input / 1915',
        gallons: 'input / 307',
    },
    cubicinches: {
        litres: 'input / 61.024',
        tablespoons: 'input * 1.108',
        cups: 'input / 14.646',
        cubicfeet: 'input / 1728',
        gallons: 'input / 277',
    },
    cups: {
        litres: 'input / 4.167',
        tablespoons: 'input * 16.231',
        cubicinches: 'input * 14.646',
        cubicfeet: 'input / 118',
        gallons: 'input / 18.942',
    },
    cubicfeet: {
        litres: 'input * 28.317',
        tablespoons: 'input * 1915',
        cubicinches: 'input * 1728',
        cups: 'input * 118',
        gallons: 'input * 6.229',
    },
    gallons: {
        litres: 'input * 4.546',
        tablespoons: 'input * 307',
        cubicinches: 'input * 277',
        cups: 'input * 18.942',
        cubicfeet: 'input / 6.229',
    }
}

router.post("/", function (req, res, next) {
    try {
        if (!req || !req.body) {
            return res.status(400).send({
                message: 'Body not available'
            });
        }
        let input = req.body.input;
        let value = eval(formula[req.body.source][req.body.target]);
        value = Math.round((value + Number.EPSILON) * 100) / 100;
        let output, message;
        if (Math.floor(req.body.response) === Math.floor(value)) {
            message = 'Correct';
            output = 'Actual Value: ' + value + ' (Output: Correct)';
        } else {
            message = 'Incorrect';
            output = 'Actual Value: ' + value + ' (Output: Incorrect)';
        }
        let data = {
            message: message,
            output: output
        };
        return res.status(200).send(data);
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;
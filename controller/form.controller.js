const fs = require('fs');
const { v4 } = require('uuid');
const { regex } = require('../utils/regex');

async function create(req, res, next) {
    try {
        const database = fs.readFileSync('data.json');
        const myObject= JSON.parse(database);

        const data = req.body
        const file = req.file

        if(data.name.length === 0 || data.name.length > 100) {
            throw new Error("Name is not valid");
        }
        if(!regex.price.test(data.price)){
            throw new Error("Price is not valid");
        }


        myObject.push(
            {
                ...data,
                price: parseInt(data.price),
                id: v4(),
                file: file ? file.path : "",
                like: false,
            });
        var newData = JSON.stringify(myObject);
        fs.writeFile('data.json', newData, err => {
            // error checking
            if(err) throw err;
        });   
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.status(400).send({ error: e.error, message: e.message });
    }
}


async function get(req, res, next) {
    try {
        const database = fs.readFileSync('data.json');
        const myObject= JSON.parse(database);

        return res.status(200).send(myObject);

    } catch (e) {
        console.log(e);
        return res.status(400).send({ error: e.error, message: e.message });
    }
}

async function likeDislike(req, res, next) {
    try {
        const data = req.body

        const database = fs.readFileSync('data.json');
        const myObject= JSON.parse(database);


        myObject.map((item) => {
            if(item.id === data.id) {
                item.like = !item.like
            }
        });

        var newData = JSON.stringify(myObject);
        fs.writeFile('data.json', newData, err => {
            // error checking
            if(err) throw err;
        });   

        return res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.status(400).send({ error: e.error, message: e.message });
    }
}

module.exports = { create, get, likeDislike };
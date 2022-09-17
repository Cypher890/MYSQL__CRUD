const mysql = require('mysql2')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

let mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sonudb",
    multipleStatements: true
})

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connection successful")
    } else {
        console.log("Connection failed" + JSON.stringify(err))
    }
})

app.listen(3000, () => {
    console.log("connected to port 3000")
})

app.get('/people', (req, res) => {
    mysqlConnection.query('SELECT * FROM persons', (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        } else {
            console.log(err)
        }

    })
})

app.get('/people/:id', (req, res) => {


    mysqlConnection.query('SELECT * FROM persons WHERE PersonID = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        } else {
            console.log(err)
        }

    })

})

app.delete('/people/:id', (req, res) => {


    mysqlConnection.query('DELETE FROM persons WHERE PersonID = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send('Deleted successfully')
        } else {
            console.log(err)
        }

    })

})

app.post('/people/new', (req, res) => {

    mysqlConnection.query(`INSERT INTO persons(PersonID,LastName,FirstName,Address,City)
                            VALUES('${req.body.PersonID}','${req.body.LastName}','${req.body.FirstName}','${req.body.Address}','${req.body.City}')`, (err, rows, fields) => {
        if (!err) {
            res.send('Data added successfully')
        } else {
            console.log(err)
        }

    })



})

app.patch('/people/edit', (req, res) => {

    mysqlConnection.query(`UPDATE persons SET ${req.body.set}
                                WHERE ${req.body.where} `, (err, rows, fields) => {
        if (!err) {
            res.send('Data updated successfully')
        } else {
            console.log(err)
        }

    })
    // console.log(req.body.set)
    // console.log(req.body.where)


})

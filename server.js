const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json')
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

app.get('/seoul',(req, res)=>{
    connection.query(
        "SELECT * FROM ROOMS",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

app.get('/houses',(req, res)=>{
    connection.query(
        "SELECT * FROM ROOMS",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 매물 유형
app.get('/api/seoul/house_type_distribution',(req, res)=>{
    connection.query(
        `
        SELECT h.house_type HOUSE_TYPE, sum(bed_cnt) TOTAL_BED_CNT
        FROM houses as h, rooms as r
        WHERE h.id=r.house_id
        GROUP BY h.house_type;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

app.listen(port, ()=> console.log(`Listening on port ${port}`));
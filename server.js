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

//서울시 인실 점유율
app.get('/api/seoul/bed_cnt_group',(req, res)=>{
    connection.query(
        `
        SELECT r.bed_cnt, COUNT(r.bed_cnt) 갯수
        FROM sharehouse.rooms as r
        GROUP BY r.bed_cnt;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 구간별 월세
app.get('/api/seoul/bed_cnt_group',(req, res)=>{
    connection.query(
        `
        SELECT count(if(b.monthly_rent>0 and b.monthly_rent <=20,true,null)) "0~20", 
        count(if(b.monthly_rent>20 and b.monthly_rent <=40,true,null)) "20~40",
        count(if(b.monthly_rent>40 and b.monthly_rent <=60,true,null)) "40~60",
        count(if(b.monthly_rent>60 and b.monthly_rent <=80,true,null)) "60~80",
        count(if(b.monthly_rent>80 and b.monthly_rent <=100,true,null)) "80~100",
        count(if(b.monthly_rent>100,true,null)) "100~"
        FROM sharehouse.beds as b;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 구간별 보증금
app.get('/api/seoul/bed_cnt_group',(req, res)=>{
    connection.query(
        `
        SELECT count(if(b.deposit>0 and b.deposit <=300,true,null)) "0~300", 
        count(if(b.deposit>300 and b.deposit <=500,true,null)) "300~500",
        count(if(b.deposit>500 and b.deposit <=1000,true,null)) "500~1000",
        count(if(b.deposit>1000,true,null)) "1000~"
        FROM sharehouse.beds as b;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})



app.listen(port, ()=> console.log(`Listening on port ${port}`));
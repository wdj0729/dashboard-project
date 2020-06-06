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

//서울시 요약(서울시 전체방갯수, 전체침대갯수, 평균보증금, 평균월세) ok
app.get('/api/seoul/summary',(req, res)=>{
    connection.query(
        `
        SELECT count(if(b.is_full=true,true,null)) 전체거주예상인원수, sum(r.bed_cnt) 전체매물갯수, avg(b.deposit) 평균보증금, avg(b.monthly_rent) 평균월세
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//자치구별 요약값(성비율 미반영) ok
app.get('/api/seoul/summary_by_district',(req, res)=>{
    connection.query(
        `
        SELECT h.district 자치구, count(if(b.is_full=true,true,null)) 거주예상인원수, 
        count(b.id) 매물수, avg(b.deposit) 평균보증금, avg(b.monthly_rent) 평균월세,
        count(if(b.is_full=false,true,null))/count(b.id)*100 공실율
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id
        GROUP BY h.district;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 지역별 거주 예상인원수(현재?) ok
app.get('/api/seoul/filled_bedcnt_by_district',(req, res)=>{
    connection.query(
        `
        SELECT h.district 자치구, count(if(b.is_full=true,true,null)) 거주예상인원수
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id
        GROUP BY h.district
        WITH ROLLUP;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//전체 매물 리스트 테이블(매물링크 미구현)
app.get('/api/seoul/total_beds_table',(req, res)=>{
    connection.query(
        `
        SELECT h.house_name 이름, h.house_type 매물유형, r.room_name 방이름, h.road_address 도로명주소, b.deposit 보증금, b.monthly_rent 월세, r.bed_cnt 인실, r.gender 성별
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id
        order by h.road_address;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 지역별 매물수 ok
app.get('/api/seoul/house_by_district',(req, res)=>{
    connection.query(
        `
        SELECT h.district 구, sum(r.bed_cnt) 매물
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        GROUP BY h.district
        WITH ROLLUP;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 매물 유형 ok
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

//서울시 인실 점유율 ok
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

//서울시 구간별 월세 ok
app.get('/api/seoul/monthly_rent_interval',(req, res)=>{
    connection.query(
        `
        SELECT count(if(b.monthly_rent>10 and b.monthly_rent <=20,true,null)) "10~20", 
        count(if(b.monthly_rent>20 and b.monthly_rent <=30,true,null)) "20~30",
        count(if(b.monthly_rent>30 and b.monthly_rent <=40,true,null)) "30~40",
        count(if(b.monthly_rent>40 and b.monthly_rent <=50,true,null)) "40~50",
        count(if(b.monthly_rent>50,true,null)) "50~"
        FROM sharehouse.beds as b;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 구간별 보증금 ok
app.get('/api/seoul/deposit_interval',(req, res)=>{
    connection.query(
        `
        SELECT count(if(b.deposit>0 and b.deposit <=100,true,null)) "0~100", 
        count(if(b.deposit>100 and b.deposit <=200,true,null)) "100~200",
        count(if(b.deposit>200 and b.deposit <=300,true,null)) "200~300",
        count(if(b.deposit>300,true,null)) "300~"
        FROM sharehouse.beds as b;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})



app.listen(port, ()=> console.log(`Listening on port ${port}`));
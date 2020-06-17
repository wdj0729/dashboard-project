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

//서울시 매물 유형 분포 ok
app.get('/api/sharekim/house_type_distribution',(req, res)=>{
    connection.query(
        `
        SELECT 
            h.house_type HOUSE_TYPE, SUM(bed_cnt) TOTAL_BED_CNT
        FROM
            sharehouse.houses AS h
                INNER JOIN
            sharehouse.rooms AS r ON h.id = r.house_id
        WHERE
            DATE(h.created_at) >= DATE_FORMAT(NOW(), '%Y-%m-01')
        GROUP BY h.house_type WITH ROLLUP;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 인실 점유율 ok
app.get('/api/sharekim/bed_cnt_group',(req, res)=>{
    connection.query(
        `
        SELECT 
            r.bed_cnt, COUNT(r.bed_cnt) 갯수
        FROM
            sharehouse.rooms AS r
                INNER JOIN
            sharehouse.houses AS h ON h.id = r.house_id
        WHERE
            DATE(h.created_at) >= DATE_FORMAT(NOW(), '%Y-%m-01')
        GROUP BY r.bed_cnt;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 구간별 보증금 ok
app.get('/api/sharekim/deposit_interval',(req, res)=>{
    connection.query(
        `
        SELECT count(if(b.deposit>0 and b.deposit <=50,true,null)) "0~50",
        count(if(b.deposit>50 and b.deposit <=100,true,null)) "50~100",
        count(if(b.deposit>100 and b.deposit <=200,true,null)) "100~200",
        count(if(b.deposit>200 and b.deposit <=300,true,null)) "200~300",
        count(if(b.deposit>300,true,null)) "300~"
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id
        WHERE DATE(h.created_at) >= DATE_FORMAT(NOW(), '%Y-%m-01')
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 구간별 월세 ok
app.get('/api/sharekim/monthly_rent_interval',(req, res)=>{
    connection.query(
        `
        SELECT count(if(b.monthly_rent>=0 and b.monthly_rent <=20,true,null)) "0~20", 
        count(if(b.monthly_rent>20 and b.monthly_rent <=30,true,null)) "20~30",
        count(if(b.monthly_rent>30 and b.monthly_rent <=40,true,null)) "30~40",
        count(if(b.monthly_rent>40 and b.monthly_rent <=50,true,null)) "40~50",
        count(if(b.monthly_rent>50,true,null)) "50~"
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id
        WHERE DATE(h.created_at) >= DATE_FORMAT(NOW(), '%Y-%m-01');
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 요약(서울시 전체방갯수, 전체침대갯수, 평균보증금, 평균월세) ok
app.get('/api/sharekim/summary',(req, res)=>{
    connection.query(
        `
        SELECT count(if(b.is_full=true,true,null)) 전체거주예상인원수, count(h.id) 전체매물갯수, avg(b.deposit) 평균보증금, avg(b.monthly_rent) 평균월세
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id
        WHERE DATE(h.created_at) >= DATE_FORMAT(NOW(), '%Y-%m-01');
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//자치구별 요약 ok
app.get('/api/sharekim/summary_by_district',(req, res)=>{
    connection.query(
        `
        SELECT h.district 자치구, count(if(b.is_full=true,true,null)) 거주예상인원수, 
        count(b.id) 매물수, avg(b.deposit) 평균보증금, avg(b.monthly_rent) 평균월세,
        count(if(r.gender='M',true,null)) M,
        count(if(r.gender='N',true,null)) N,
        count(if(r.gender='F',true,null)) F,
        count(if(b.is_full=false,true,null))/count(b.id)*100 공실율
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id
        WHERE DATE(h.created_at) >= DATE_FORMAT(NOW(), '%Y-%m-01')
        GROUP BY h.district;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 지역별 거주 예상인원수(현재?) ok
app.get('/api/sharekim/filled_bedcnt_by_district',(req, res)=>{
    connection.query(
        `
        SELECT h.district 자치구, count(if(b.is_full=true,true,null)) 거주예상인원수
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id
        WHERE DATE(h.created_at) >= DATE_FORMAT(NOW(), '%Y-%m-01')
        GROUP BY h.district
        WITH ROLLUP;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//서울시 지역별 매물수 ok
app.get('/api/sharekim/house_by_district',(req, res)=>{
    connection.query(
        `
        SELECT h.district 구, count(b.id) 매물
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id
        WHERE DATE(h.created_at) >= DATE_FORMAT(NOW(), '%Y-%m-01')
        GROUP BY h.district
        WITH ROLLUP;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//전체 매물 리스트 테이블(매물링크 미구현) ok
app.get('/api/sharekim/total_bed_table',(req, res)=>{
    connection.query(
        `
        SELECT h.house_name 이름, h.house_type 매물유형, r.room_name 방이름, h.road_address 도로명주소, b.deposit 보증금, b.monthly_rent 월세, r.bed_cnt 인실, r.gender 성별
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id
        WHERE DATE(h.created_at) >= DATE_FORMAT(NOW(), '%Y-%m-01')
        order by h.road_address;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//인실별 보증금 구간 ok
app.get('/api/sharekim/deposit_interval_by_roomfor',(req, res)=>{
    connection.query(
        `
        SELECT r.bed_cnt 인실, count(if(b.deposit>=0 and b.deposit <=50,true,null)) "0~50", 
        count(if(b.deposit>50 and b.deposit <=100,true,null)) "50~100",
        count(if(b.deposit>100 and b.deposit <=200,true,null)) "100~200",
        count(if(b.deposit>200 and b.deposit <=300,true,null)) "200~300",
        count(if(b.deposit>300,true,null)) "300~"
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id
        where DATE(h.created_at) >= DATE_FORMAT(NOW(), '%Y-%m-01')
        GROUP BY r.bed_cnt
        WITH ROLLUP;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

//인실별 월세 구간 ok
app.get('/api/sharekim/monthly_rent_interval_by_roomfor',(req, res)=>{
    connection.query(
        `
        SELECT r.bed_cnt 인실, count(if(b.monthly_rent>=0 and b.monthly_rent <=20,true,null)) "0~20",
        count(if(b.monthly_rent>20 and b.monthly_rent <=30,true,null)) "20~30",
        count(if(b.monthly_rent>30 and b.monthly_rent <=40,true,null)) "30~40",
        count(if(b.monthly_rent>40 and b.monthly_rent <=50,true,null)) "40~50",
        count(if(b.monthly_rent>50,true,null)) "50~"
        FROM sharehouse.houses as h
        INNER JOIN sharehouse.rooms as r
        ON h.id = r.house_id
        INNER JOIN sharehouse.beds as b
        ON r.id = b.room_id
        where DATE(h.created_at) >= DATE_FORMAT(NOW(), '%Y-%m-01')
        GROUP BY r.bed_cnt
        WITH ROLLUP;
        `,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})



app.listen(port, ()=> console.log(`Listening on port ${port}`));
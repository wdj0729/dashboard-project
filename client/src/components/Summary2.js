import React, {useEffect} from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SummaryData from './Summary2.json'

//API 설정
const API = 'http://localhost:5000/api/seoul/total_beds_table'

//console.log(SummaryData);

const columns = [
  { id: 'id', label: '', minWidth: 100, align: 'center' },
  { id: 'house_name', label: '지점명', minWidth: 100, align: 'center' },
  { id: 'house_type', label: '매물유형', minWidth: 100, align: 'center' },
  { id: 'room_name', label: '방이름', minWidth: 100, align: 'center' },
  { id: 'road_address', label: '도로명주소', minWidth: 100, align: 'center' },
  {
    id: 'deposit',
    label: '보증금',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'rent',
    label: '월세',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'bed_cnt', label: '인실', minWidth: 100, align: 'center' },
  { id: 'gender', label: '성별전용', minWidth: 100, align: 'center' },
];

const rows = [];

for (var i=0; i<4703; i++){
  if(SummaryData[i]["매물유형"]==="villa"){
    SummaryData[i]["매물유형"]="빌라";
  }
  if(SummaryData[i]["매물유형"]==="etc"){
    SummaryData[i]["매물유형"]="기타";
  }
  if(SummaryData[i]["매물유형"]==="office"){
    SummaryData[i]["매물유형"]="오피스텔";
  }
  if(SummaryData[i]["매물유형"]==="apt"){
    SummaryData[i]["매물유형"]="아파트";
  }
  if(SummaryData[i]["매물유형"]==="oneroom"){
    SummaryData[i]["매물유형"]="원룸";
  }
  if(SummaryData[i]["매물유형"]==="house"){
    SummaryData[i]["매물유형"]="단독주택";
  }
  rows[i] = createData(i+1,SummaryData[i]["이름"], SummaryData[i]["매물유형"], SummaryData[i]["방이름"], SummaryData[i]["도로명주소"], 
                        SummaryData[i]["보증금"], SummaryData[i]["월세"], SummaryData[i]["인실"], SummaryData[i]["성별"]);
  //console.log(rows[i]);
}

function createData(id, house_name, house_type, room_name, road_address, deposit, rent, bed_cnt, gender) {
  return {id,house_name, house_type, room_name, road_address, deposit, rent, bed_cnt, gender};
}

const useStyles = makeStyles({
  root: {
    width: '90%',
    padding: '0 5%',
  },
  container: {
    maxHeight: 440,
  },
});

//HOOK 구조
export default function StickyHeadTable2(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=>{
    fetch(API)
    .then(res => res.json())
    .then(json =>{
          //console.log(json);
      })
  })

  return (
    <Paper className={classes.root}>
      <br></br>
      <div className="Summary2-title">
          <p>침대 상세 정보</p>
      </div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
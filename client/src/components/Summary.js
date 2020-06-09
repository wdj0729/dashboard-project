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
import SummaryData from './Summary.json'

//API 설정
const API = 'http://localhost:5000/api/seoul/summary'

//console.log(SummaryData);

const columns = [
  { id: 'id', label: '', minWidth: 100, align: 'center' },
  { id: 'district', label: '자치구', minWidth: 100, align: 'center' },
  {
    id: 'population',
    label: '거주예상 인원수',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'house_cnt',
    label: '매물 개수',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'avg_deposit',
    label: '평균 보증금',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(0),
  },
  {
    id: 'avg_rent',
    label: '평균 월세',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(0),
  },
];

const rows = [];

for (var i=0; i<25; i++){
  rows[i] = createData(i+1, SummaryData[i]["자치구"], SummaryData[i]["거주예상인원수"], SummaryData[i]["매물수"], SummaryData[i]["평균보증금"], SummaryData[i]["평균월세"]);
  //console.log(rows[i]);
}

function createData(id, district, population, house_cnt, avg_deposit, avg_rent) {
  return { id, district, population, house_cnt, avg_deposit, avg_rent};
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
export default function StickyHeadTable(props) {
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
      <br></br><br></br>
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
        rowsPerPageOptions={[10, 25]}
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
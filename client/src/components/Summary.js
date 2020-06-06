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

//API 설정
const API = 'http://localhost:5000/api/seoul/summary_by_district'

const columns = [
  { id: 'district', label: '자치구', minWidth: 100 },
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

const rows = [
    createData('관악구', 80, 370, 114, 41),
    createData('영등포구', 33, 142, 83, 41),
    createData('강남구', 84, 510, 246, 45),
    createData('광진구', 45, 323, 108, 41),
    createData('구로구', 9, 94, 165, 36),
    createData('강북구', 11, 48, 75, 45),
    createData('성동구', 34, 123, 161, 42),
    createData('마포구', 218, 818, 104, 42),
    createData('중구', 23, 142, 91, 44),
    createData('강서구', 2, 42, 89, 37),
    createData('동작구', 25, 206, 110, 38),
    createData('동대문구', 111, 287, 368, 40),
    createData('강동구', 4, 49, 151, 37),
    createData('서초구', 63, 289, 121, 43),
    createData('서대문구', 91, 468, 86, 41),
    createData('성북구', 37, 187, 91, 39),
    createData('노원구', 42, 63, 68, 34),
    createData('종로구', 30, 139, 119, 46),
    createData('용산구', 82, 209, 94, 43),
    createData('송파구', 26, 55, 88, 44),
    createData('은평구', 8, 81, 235, 35),
    createData('도봉구', 1, 12, 71, 35),
    createData('중랑구', 6, 27, 63, 35),
    createData('금천구', 0, 8, 100, 37),
    createData('양천구', 1, 11, 59, 29),
];

function createData(district, population, house_cnt, avg_deposit, avg_rent) {
  return { district, population, house_cnt, avg_deposit, avg_rent};
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
          
      })
  })

  return (
    <Paper className={classes.root}>
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.population}>
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
        rowsPerPageOptions={[10, 20, 30]}
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
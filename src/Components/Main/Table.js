import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './MainTable.css'
import moment, { normalizeUnits } from 'moment'
import {  makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
const headCells = [
  { id: 'id-number', numeric: true, disablePadding: true, label: 'ID number' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'suppler', numeric: false, disablePadding: false, label: 'Supplier' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
];

function MainTable({ rows }) {
  const [selectedRows , setSelectedRows] = useState([]) ;
  const [nextArrow, setNextArrow ]= useState(false);
  const [backArrow, setBackArrow]= useState(true);
  const [currentPage ,  setCurrentPage] = useState(1);
  const rowsPerPage = 8 ;

  //table pagination

  const rowsAfterPagingAndSorting = () =>{
    console.log(backArrow + " " + nextArrow)
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    if(indexOfFirstRow < rows.length){
      if(indexOfLastRow > rows.length) {
         const newRows = rows.slice(indexOfFirstRow ,rows.length);
         return newRows ;
      }
      const newRows = rows.slice(indexOfFirstRow,indexOfLastRow);
      return newRows ;
    }
    if(rows.length < 8){
      return rows.slice(0 ,rows.length);
    }
    return rows.slice(0 ,8);
  }
  // chip: {
  //   color: ({ color }) => color,
  //   backgroundColor: ({ backgroundColor }) => backgroundColor,
  //   "&:hover, &:focus": {
  //     backgroundColor: ({ hoverBackgroundColor, backgroundColor }) =>
  //       hoverBackgroundColor
  //         ? hoverBackgroundColor
  //         : emphasize(backgroundColor, 0.08)
  //   },
  //   "&:active": {
  //     backgroundColor: ({ hoverBackgroundColor, backgroundColor }) =>
  //       emphasize(
  //         hoverBackgroundColor ? hoverBackgroundColor : backgroundColor,
  //         0.12
  //       )
  //   }
  // }
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)

    if(newPage== 1){
       setBackArrow(true);
       setNextArrow(false);

    }
    else{
      if(rows.length < (newPage*8)){
        setBackArrow(false);
        setNextArrow(true);

     } else{
      setBackArrow(false);
      setNextArrow(false);
     }

    }

  };

  const useStyles = makeStyles({
    tableContainer: {
      "& thead th" :{
      fontFamily: 'Poppins',
      fontWeight: 400,
      color: '#334D6E',
      fontSize: '13px',
      },
      "& tbody td" :{
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: '#707683',
        fontSize: '13px',

      },
      "& tbody tr:hover" :{
        cursor: 'pointer',
        backgroundColor: '#F3F7FB'


      }

    },
    tableCellID: {
      color: "#323C47",
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: '13px',
    },
    tablePaginationCaption: {
      display: 'none'
    }

  });

  const classes = useStyles();

  return (
    <div className='main-table'>
      <h1>Hello</h1>

      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label="simple table" >

          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              <Checkbox size= "small" disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell

                  align={'left'}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {
                console.log( rowsAfterPagingAndSorting() )
          }
            {
            rowsAfterPagingAndSorting().map((row) => (
              <TableRow key={row.id}>

                <TableCell padding="checkbox">

                  <Checkbox
                    size="small"
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    checked={false}
                  />
                </TableCell>
                <TableCell className={classes.tableCellID} align="left">{'#' + row.id}</TableCell>
                <TableCell align="left">{row.customer.fname}</TableCell>
                <TableCell align="left">{row.status.replace("_", " ")}</TableCell>
                <TableCell align="left">{row.supplier}</TableCell>
                <TableCell align="left">{moment(row.created_at).format("MMMM D,h:mma,YYYY")}</TableCell>
              </TableRow>
            )
            )

            }

          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination

         nextIconButtonProps={nextArrow ? {disabled:true} : {disabled:false}}
         backIconButtonProps={backArrow ? {disabled:true} : {disabled:false}}
         component="div"
         rowsPerPageOptions={[8]}
         count={rows.lenght}
         rowsPerPage={rowsPerPage}
         page={currentPage}
         onChangePage={handleChangePage}
         classes={{

          caption: classes.tablePaginationCaption,

            // root: classes.tablePagination,
            // caption: classes.tablePaginationCaption,
            // selectIcon: classes.tablePaginationSelectIcon,
            // select: classes.tablePaginationSelect,
            // actions: classes.tablePaginationActions,


        }}


        />
    </div>
  );
}

export default MainTable;

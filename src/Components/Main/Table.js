import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './MainTable.css'
import moment, { normalizeUnits } from 'moment'

import { makeStyles } from '@material-ui/core/styles';
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

function MainTable({ rows , filterFunction}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [nextArrow, setNextArrow] = useState(false);
  const [backArrow, setBackArrow] = useState(true);
  const [sortRow, setSortRow] = useState(false);
  const [sortSelectValue , setSortSelectValue] = useState("");
  const [filterRows, setFilterRows] = useState(false);
  const [filerSelectValue , setFilterSelectValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;


  //table sorting
  function ascendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return 1;
    }
    if (b[orderBy] > a[orderBy]) {
      return -1;
    }
    return 0;
  }
  function getComparator(orderBy) {
    return (a, b) => ascendingComparator(a, b, orderBy);
  }

  //on selecting sorting option
  const handleSortOption = (event)=>{
      if(event.target.value === 'sortasc'){
        setSortRow(true);
        setSortSelectValue(event.target.value);
      }else{
        setSortRow(false);
        setSortSelectValue('');
      }
  }

  //table pagination

  const rowsAfterSorting = (filteredRows) =>{
    console.log("alaaaaa " + sortRow);
    if(sortRow){
      console.log("sortttttt " + sortRow);
      return stableSort(filteredRows, getComparator('supplier'));

    }
    return filteredRows;
  }
  const rowsAfterPagingAndSorting = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const sortedRowsResult = rowsAfterSorting(rows);
    console.log("sortttttt " + sortedRowsResult);
    if (indexOfFirstRow < rows.length) {
      if (indexOfLastRow > rows.length) {

        const newRows = sortedRowsResult.slice(indexOfFirstRow, rows.length);
        return newRows;
      }
      const newRows = sortedRowsResult.slice(indexOfFirstRow, indexOfLastRow);
      return newRows;
    }
    if (rows.length < 8) {
      return sortedRowsResult.slice(0, rows.length);
    }
    return sortedRowsResult.slice(0, 8);
  }

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)

    if (newPage === 1) {
      setBackArrow(true);
      setNextArrow(false);

    }
    else {
      if ( rows.length < (newPage * 8)) {
        setBackArrow(false);
        setNextArrow(true);

      } else {
        setBackArrow(false);
        setNextArrow(false);
      }

    }

  };
  //filtering rows
  const handleFiltering = (event) => {
    event.target.value === 'totalFilter' ? setFilterRows(true) : setFilterRows(false) ;
    event.target.value === 'totalFilter' ? filterFunction(true) : filterFunction(false)  ;
    setFilterSelectValue(event.target.value);
    handlePagingAfterFiltering();
  }

  const handlePagingAfterFiltering = ()=>{
    setCurrentPage(1);
    if (currentPage === 1) {
      setBackArrow(true);
      setNextArrow(false);

    }
    else {

      if ( rows.length < (currentPage * 8)) {
        setBackArrow(false);
        setNextArrow(true);

      } else {
        setBackArrow(false);
        setNextArrow(false);
      }

    }
  }

  //sorting
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  //styles
  const useStyles = makeStyles({
    tableContainer: {
      "& thead th": {
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: '#334D6E',
        fontSize: '13px',
      },
      "& tbody td": {
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: '#707683',
        fontSize: '13px',

      },
      "& tbody tr:hover": {
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
      <div>
        <span>Requests</span>


        <span className="sortOrderOptions">
          Filters:
          <select name="filter" id="filters" onChange={handleFiltering} value={filerSelectValue}>
            <option value=""> {" " + "_" + " "} </option>
            <option value="totalFilter">Total: $2000-3000</option>

          </select>
          <i class="fas fa-caret-down"></i>
        </span>
        <span className="sortOrderOptions">
          Sort by:
          <select name="sort" id="sort" onChange={handleSortOption} value={sortSelectValue}>
            <option value=""> {" " + "_" + " "} </option>
            <option value="sortasc">Total:A to Z</option>

          </select>
          <i class="fas fa-caret-down"></i>
        </span>

      </div>






      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label="simple table" >

          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox size="small" disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={'left'}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {

                  console.log(rowsAfterPagingAndSorting())
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
      {console.log('At Table Pagination rows = ' + rows.length)}
      {(rows.length > 8) ?
      <TablePagination

        nextIconButtonProps={nextArrow ? { disabled: true } : { disabled: false }}
        backIconButtonProps={backArrow ? { disabled: true } : { disabled: false }}
        component="div"
        rowsPerPageOptions={[8]}
        count={rows.length}
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


      /> : ""}
    </div>
  );
}

export default MainTable;

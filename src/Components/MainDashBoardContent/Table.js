import React, { useState } from 'react';
import './MainTable.css'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
const headCells = [
  { id: 'id', numeric: true, disablePadding: true, label: 'ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'supplier', numeric: false, disablePadding: false, label: 'Supplier' },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Created At' },
];

function MainTable({ rows, filterFunction, selectedElements, getCountSelectedElements, setSelectedItem, setSearchChange }) {
  const [nextArrow, setNextArrow] = useState(false);
  const [backArrow, setBackArrow] = useState(true);
  const [selectColumn, setSelectColumn] = useState(false);
  const [selectColumnLabel, setSelectColumnLabel] = useState("");
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [filterRows, setFilterRows] = useState(false);
  const [filerSelectValue, setFilterSelectValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;


  //Search
  const handleSearchChange = (event) => {
    setSearchChange((event.target.value).toLowerCase(), selectColumnLabel);
  };


  //table sorting
  function descendingComparator(a, b, orderBy) {
    let aString = "";
    let bString = "";
    if (orderBy === 'name') {
      aString = JSON.stringify(a['customer']['fname'])
      bString = JSON.stringify(b['customer']['fname'])

    } else {
      if (orderBy === 'created_at') {
        aString = a[orderBy];
        bString = b[orderBy];
      }
      else {

        aString = JSON.stringify(a[orderBy])
        bString = JSON.stringify(b[orderBy])

      }

    }

    if (bString < aString) {
      return -1;
    }
    if (bString > aString) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  //on selecting sorting option
  const handleSortOption = (event) => {
    if (event.target.value === 'asc') {
      setOrder('asc');
      setSortSelectValue(event.target.value);
    } else {
      if (event.target.value === 'desc') {
        setOrder('desc');
        setSortSelectValue(event.target.value);
      } else {
        setOrder('');
        setSortSelectValue('');
      }

    }
    // setOrderBy('');
    // setSelectColumn(false);
    // setSelectColumnLabel('');
  }
  const handleSort = (headCellID) => {
    if (orderBy == headCellID) {
      setOrderBy('');
      setSelectColumn(false);
      setSelectColumnLabel('');

    } else {
      setOrderBy(headCellID);
      setSelectColumn(true);
      setSelectColumnLabel(headCellID)

    }





  }
  //table pagination

  const rowsAfterSorting = (rows) => {
    if (selectColumn && order) {
      const results = stableSort(rows, getComparator(order, orderBy));
      return results;
    }
    return rows;
  }
  const rowsAfterPagingAndSorting = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const sortedRowsResult = rowsAfterSorting(rows);
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
      if (rows.length < (newPage * 8)) {
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
    event.target.value === 'totalFilter' ? setFilterRows(true) : setFilterRows(false);
    event.target.value === 'totalFilter' ? filterFunction(true) : filterFunction(false);
    setFilterSelectValue(event.target.value);
    handlePagingAfterFiltering();

  }

  const handlePagingAfterFiltering = () => {
    setCurrentPage(1);
    if (currentPage === 1) {
      setBackArrow(true);
      setNextArrow(false);

    }
    else {

      if (rows.length < (currentPage * 8)) {
        setBackArrow(false);
        setNextArrow(true);

      } else {
        setBackArrow(false);
        setNextArrow(false);
      }

    }
  }

  //styles
  const useStyles = makeStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 950,
      position: 'relative',
      left: -35

    },
    input: {
      marginLeft: 1,
      flex: 1,
    },
    iconButton: {
      padding: 10


    },
    textField: {
      width: '949px',
      marginBottom: '30px',
      backgroundColor: 'white',
      color: 'white',
      paddingBottom: 0,
      marginTop: '0px',
      marginLeft: '0px',
      fontWeight: 500,
      display: 'flex',
      height: '60px',
      position: 'relative',
      left: '-35px',
      borderColor: 'transparent',
      fontSize: '10px'

    },
    tableContainer: {
      width: '900px',
      "& thead th": {
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: '#334D6E',
        fontSize: '10px',
        cursor: 'pointer',
        transition: 'font-size 0.3s'
      },
      "& thead th:hover": {
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: '#109CF1',
        fontSize: '12px',
        cursor: 'pointer'
      },
      "& tbody td": {
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: '#707683',
        fontSize: '10px',


      },
      "& tbody tr:hover": {
        cursor: 'pointer',
        backgroundColor: '#B5E3FA'


      }
    }
    ,
    tableCellID: {
      color: "#323C47",
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: '10px',
    },
    tablePaginationCaption: {
      display: 'none'
    },
    tableRowSelected: {
      backgroundColor: '#B5E3FA'

    },
    tableRowPending: {
      backgroundColor: '#F3F7FB'
    }

  });
  const handleSelectedItem = (event, itemID) => {
    setSelectedItem(itemID);
  }

  const classes = useStyles();


  return (
    <div className='main-table'>
      <Paper component="form" className={classes.root}>
        <SearchIcon disabled="true" disableRipple="true" disableFocusRipple="true" />

        <InputBase
          className={classes.input}
          placeholder="Search By Customer Name"
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={handleSearchChange}
        />
        <IconButton color="primary" className={classes.iconButton} aria-label="directions">
          <NotificationsNoneIcon />
        </IconButton>
      </Paper>

      <div className="mainDashboard">
        <span>Requests</span>


        <span className="sortOrderOptions">
          Filters:
          <select name="filter" id="filters" style={{ cursor: "pointer" }} onChange={handleFiltering} value={filerSelectValue}>
            <option value=""> No Filter </option>
            <option value="totalFilter">Total: $2000-3000</option>
          </select>
          <i class="fas fa-caret-down"></i>
        </span>
        <span className="sortOrderOptions">
          Sort by:
          <select name="sort" id="sort" style={{ cursor: "pointer" }} onChange={handleSortOption} value={sortSelectValue}>
            <option value="">No Sort</option>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
          <i class="fas fa-caret-down"></i>

        </span>
        {/* <IconButton style={{float:"right" , position:'relative' , left:'330px' , top:'-10px'}} onClick={()=> setFilterDivAppear(!filterDivAppear)}>
          <AddBoxIcon style={{fontSize:"small" , fill:"blue"}} />
        </IconButton> */}

        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table aria-label="simple table" >

            <TableHead>
              <TableRow>

                {getCountSelectedElements() > 0 ?
                  <div className="selectedDiv">
                    <p style={{ color: "blue", width: "100px", backgroundColor: "transparent", fontSize: "15px", marginLeft: "5px" }}>
                      {getCountSelectedElements()} are selected

                    </p>
                    <IconButton style={{ position: "relative", left: "750px", float: "right" }}>  <DeleteOutlineIcon style={{ fill: "black" }} /></IconButton>
                  </div>
                  : ""}
                {getCountSelectedElements() == 0 ? <TableCell padding="checkbox">
                  <Checkbox size="small" disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />
                </TableCell> : ""}

                {getCountSelectedElements() == 0 ? headCells.map((headCell) => {
                  return (selectColumn && (selectColumnLabel === headCell.id) ?



                    <TableCell
                      style={{ color: "#109CF1" }}
                      key={headCell.id}
                      align={'left'}
                      onClick={() => handleSort(headCell.id)}
                      name={headCell.id}
                    >

                      {headCell.label}


                    </TableCell>
                    :


                    <TableCell
                      key={headCell.id}
                      align={'left'}
                      onClick={() => handleSort(headCell.id)}
                      name={headCell.id}
                    >

                      {headCell.label}


                    </TableCell>

                  )
                }) : ""}

              </TableRow>
            </TableHead>
            <TableBody>

              {
                rowsAfterPagingAndSorting().map((row) => {
                  const isItemSelected = selectedElements[row.id] ? true : false;
                  const rowStyle = (row.status === "pending_confirmation") ? classes.tableRowPending : "";
                  return (

                    <TableRow
                      key={row.id}
                      onClick={(event) => handleSelectedItem(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      className={isItemSelected ? classes.tableRowSelected : rowStyle}
                    >

                      <TableCell padding="checkbox">
                        <Checkbox
                          size="small"
                          checked={isItemSelected}
                          color="primary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}

                        />
                      </TableCell>
                      <TableCell className={classes.tableCellID} align="left">{'#' + row.id}</TableCell>
                      <TableCell align="left">{row.customer.fname}</TableCell>
                      <TableCell align="left">{row.status.replace("_", " ")}</TableCell>
                      <TableCell align="left">{row.supplier}</TableCell>
                      <TableCell align="left">{moment(row.created_at).format("MMMM D,h:mma,YYYY")}</TableCell>
                    </TableRow>
                  )
                }
                )

              }

            </TableBody>
          </Table>
        </TableContainer>
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

              caption: classes.tablePaginationCaption


            }}


          /> : ""}
      </div>


    </div>
  );
}

export default MainTable;

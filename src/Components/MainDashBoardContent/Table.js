import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
const headCells = [
  { id: 'id-number', numeric: true, disablePadding: true, label: 'ID number' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'supplier', numeric: false, disablePadding: false, label: 'Supplier' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
];

function MainTable({ rows, filterFunction, selectedElements, setSelectedItem, setSearchChange }) {
  const [nextArrow, setNextArrow] = useState(false);
  const [backArrow, setBackArrow] = useState(true);
  const [sortRow, setSortRow] = useState(false);
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [filterRows, setFilterRows] = useState(false);
  const [filerSelectValue, setFilterSelectValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;


  //Search
  const handleSearchChange = (event) => {
    setSearchChange((event.target.value).toLowerCase());
  };


  //table sorting
  function descendingComparator(a, b, orderBy) {
    console.log('sort descendingComparator ' + JSON.stringify(a['supplier']) + " with " + JSON.stringify(b['supplier']));
    const aString = JSON.stringify(a['supplier'])
    const bString = JSON.stringify(b['supplier'])
    // console.log('sort descendingComparator ' + aString +" with " + bString  + " compare " );
    if (bString < aString) {
      console.log('sort descendingComparator ' + aString + " with " + bString + " compare -1 ");
      return -1;
    }
    if (bString > aString) {
      console.log('sort descendingComparator ' + aString + " with " + bString + " compare 1 ");
      return 1;
    }
    console.log('sort descendingComparator ' + aString + " with " + bString + " compare 0 ");
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
      console.log('sort is done ' + JSON.stringify(a[0]) + " " + JSON.stringify(b[0]) + " result = " + order);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    console.log('sort not done')
    return stabilizedThis.map((el) => el[0]);
  }

  //on selecting sorting option
  const handleSortOption = (event) => {
    if (event.target.value === 'sortasc') {
      setSortRow(true);
      setSortSelectValue(event.target.value);
    } else {
      setSortRow(false);
      setSortSelectValue('');
    }
  }

  //table pagination

  const rowsAfterSorting = (rows) => {
    console.log("alaa sort is = " + sortRow);
    if (sortRow) {
      console.log("sortttttt " + sortRow);
      const results = stableSort(rows, getComparator('asc', 'gender'));
      console.log("sort results " + JSON.stringify(results));
      return results;
    }
    return rows;
  }
  const rowsAfterPagingAndSorting = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const sortedRowsResult = rowsAfterSorting(rows);
    console.log("ready to page " + JSON.stringify(sortedRowsResult));
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
      },
      "& tbody td": {
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: '#707683',
        fontSize: '10px',


      },
      "& tbody tr:hover": {
        cursor: 'pointer',
        backgroundColor: '#F3F7FB'


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
      backgroundColor: '#F3F7FB'
    },
    tableRowPending: {
      backgroundColor: '#edfff3'
    }

  });
  const handleSelectedItem = (event, itemID) => {
    setSelectedItem(itemID);
  }
  const getSelectedElementValue = (id) => {
    console.log('llo' + id)
    selectedElements.map((selectedElement) => {
      if (selectedElement.id == id) {
        console.log('llooooolllllly ' + selectedElement.id + "   " + selectedElement.selected)
        return selectedElement.selected;
      }
    })
    return false;

  }
  const classes = useStyles();


  return (
    <div className='main-table'>
      {/* <TextField className={classes.textField}  id="outlined-search" size="small" label="Search field" type="search" variant="outlined" /> */}
      <Paper component="form" className={classes.root}>
        <SearchIcon disabled="true" disableRipple="true" disableFocusRipple="true" />

        <InputBase
          className={classes.input}
          placeholder="Search"
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
          <select name="filter" id="filters" onChange={handleFiltering} value={filerSelectValue}>
            <option value=""> Click Here </option>
            <option value="totalFilter">Total: $2000-3000</option>

          </select>
          <i class="fas fa-caret-down"></i>
        </span>
        <span className="sortOrderOptions">
          Sort by:
          <select name="sort" id="sort" onChange={handleSortOption} value={sortSelectValue}>
            <option value=""> Click Here  </option>
            <option value="sortasc">Supplier:A to Z</option>
          </select>
          <i class="fas fa-caret-down"></i>
        </span>



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

                console.log('ssssssssssssssssss ' + selectedElements)
              }
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
    </div>
  );
}

export default MainTable;

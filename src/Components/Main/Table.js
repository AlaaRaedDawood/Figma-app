import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './MainTable.css'
import { lighten, makeStyles } from '@material-ui/core/styles';
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
  console.log("Main Table" + rows);
  const useStyles = makeStyles({
    tableCell: {
      fontFamily: 'Poppins',
      fontWeight: 500,
      color: '#334D6E',
      fontSize: '13px',

    }
  });
  const classes = useStyles();

  return (
    <div className='main-table'>
      <h1>Hello111</h1>

      <TableContainer component={Paper}>
        <Table aria-label="simple table" >

          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                // indeterminate={numSelected > 0 && numSelected < rowCount}
                // checked={rowCount > 0 && numSelected === rowCount}
                // onChange={onSelectAllClick}
                // inputProps={{ 'aria-label': 'select all desserts' }}
                />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  className={classes.tableCell}
                  align={headCell.numeric ? 'right' : 'left'}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
              <Checkbox
                // indeterminate={numSelected > 0 && numSelected < rowCount}
                // checked={rowCount > 0 && numSelected === rowCount}
                // onChange={onSelectAllClick}
                // inputProps={{ 'aria-label': 'select all desserts' }}
                />
                <TableCell align="left">{'#' + row.id}</TableCell>
                <TableCell align="left">{row.customer.fname}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">{row.supplier}</TableCell>
                <TableCell align="left">{row.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}

export default MainTable;

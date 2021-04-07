import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DenseTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableBody>
          {props.episodes.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.episode}</TableCell>
                <TableCell component="th" scope="row">
                <Link to={`/episodes/${row.id}`}>
                    {row.name}
                </Link>
                </TableCell>
                <TableCell component="th" scope="row">
                    {textDate(row.air_date)}
                </TableCell>
                </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function textDate(timestamp) {
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const date = new Date(timestamp);
  return `${date.getDate() + 1} de ${months[date.getMonth()]}, ${date.getFullYear()}`
}
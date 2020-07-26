import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SimpleChart from './chartComponent'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { formatNumber } from '../uteis/formater-helper'
import { getTotalExpenses, getTotalIncome, getTransactionCount } from '../uteis/reducer'
import TransactionService from '../services/TransactionService'
import { PERIODS } from '../uteis/periods'
import { styled, withStyles } from '@material-ui/core/styles';
import SimpleModal from './Modal';
import { green } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        padding: 0,
        margin: 0,
    },
    paper: {
        padding: theme.spacing(0.1),
        textAlign: 'center',
        marginTop: "5px",
        fontSize: 18,

    },

}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


export default function SimpleTable() {
    const classes = useStyles();

    const [transaction, setTransaction] = useState([]);
    const [yearMonth, setYearMonth] = useState(PERIODS[0]);


    useEffect(() => {

        retrieveTransaction();

    }, [yearMonth])

    const handSelectYearMonth = (event) => {
        setYearMonth(event.target.value);

    };

    const totalTransaction = getTotalIncome(transaction) - getTotalExpenses(transaction)
    const totalExpenses = getTotalExpenses(transaction)
    const totalIncome = getTotalIncome(transaction)
    const transactionCount = getTransactionCount(transaction)

    const deleteTransaction = ((id) => {
        TransactionService.remove(id)
            .then((response) => {
                alert(response.data.message)
            })
            .catch((e) => {
                alert(e)
            })
    })

    const filterTransactions = (query) => {
        return transaction.filter(el => el.description.toLowerCase().indexOf(query.toLowerCase()) > -1)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (value === "") {
            retrieveTransaction()
        }
        setTransaction(filterTransactions(value))

    };

    const retrieveTransaction = () => {
        TransactionService.getAll(yearMonth)
            .then((response) => {
                setTransaction(response.data);
            })
            .catch((e) => {
                console.log(e);
            });

    };

    const MyComponentGreen = styled('div')({
        color: 'green',
    });

    const MyComponentRed = styled('div')({
        color: 'red',
    });

    const MyComponentBlue = styled('div')({
        color: 'blue',
    });

    const MyComponent = styled('div')({
        color: 'green',
    });


    const handleOpen = (e) => {
        alert(e)

    }

    const handleDelete = (e) => {
        deleteTransaction(e)
        retrieveTransaction();
    }





    return (
        <div component={Paper}>
            <div >
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper} elevation={0} >
                                <h2>
                                    <Select value={yearMonth} variant="outlined" onChange={handSelectYearMonth} labelId="label" id="select" className="SelectYear" style={{ width: '450px' }}>
                                        {PERIODS.map((period) => {
                                            return (
                                                <MenuItem key={period} value={period}>
                                                    {period}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </h2>
                            </Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <Paper elevation={0} className={classes.paper}><h2>{transactionCount}</h2></Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper elevation={0} className={classes.paper}><h2>  {formatNumber(totalTransaction)}</h2></Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper elevation={0} className={classes.paper}><MyComponentRed><h2>{formatNumber(totalExpenses)}</h2></MyComponentRed></Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper elevation={0} className={classes.paper}><MyComponentGreen> <h2>{formatNumber(totalIncome)}</h2></MyComponentGreen></Paper>
                        </Grid>






                    </Grid>
                </div>



            </div >
            <br></br>
            <SimpleChart Expenses={totalExpenses} Income={totalIncome} />
            <br></br>
            <SimpleModal />



            <TextField
                id="outlined-full-width"
                label="Filtro Transactions"
                helperText="Informar a descrição do lançamento"
                fullWidth
                margin="normal"
                onChange={handleInputChange}
                name="description"
                value={transaction.description}
                default
            />


            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Year - Month</TableCell>
                            <TableCell align='left'>Category</TableCell>
                            <TableCell align='left'>Description</TableCell>
                            <TableCell align='left'>Type</TableCell>
                            <TableCell align='left'>Value</TableCell>
                            <TableCell align='center'></TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transaction.map((row) => (
                            <StyledTableRow key={row._id}>

                                <StyledTableCell align="left">{row.yearMonth}</StyledTableCell>
                                <StyledTableCell align="left">{row.category}</StyledTableCell>
                                <StyledTableCell align="left">{row.description}</StyledTableCell>

                                <StyledTableCell align="left">
                                    <IconButton >
                                        {(row.type === '-')
                                            ? <RemoveCircleOutlineIcon color='error' />
                                            : <MyComponent><AddCircleOutlineIcon /></MyComponent>
                                        }
                                    </IconButton>
                                </StyledTableCell>
                                <StyledTableCell align="left"><strong fontcolor="#0ff00" >{formatNumber(row.value)}</strong></StyledTableCell>
                                <StyledTableCell align="left"><EditIcon onClick={() => { handleOpen(row._id) }} /> <DeleteForeverIcon onClick={(e) => { handleDelete(row._id) }} /> </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div >
    );
}

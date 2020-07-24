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
import SimpleChart from '../components/simpleChart'


import { formatNumber } from '../uteis/formater-helper'
import { getTotalTransaction, getTotalExpenses, getTotalIncome, getTransactionCount } from '../uteis/reducer'
import TransactionService from '../services/TransactionService'
import { PERIODS } from '../uteis/periods'
import { styled, withStyles } from '@material-ui/core/styles';
import SimpleModal from './simpleModal';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        padding: 0,
        margin: 0,
    },
});

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



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

    const totalTransaction = getTotalTransaction(transaction)
    const totalExpenses = getTotalExpenses(transaction)
    const totalIncome = getTotalIncome(transaction)
    const transactionCount = getTransactionCount(transaction)



    const retrieveTransaction = () => {
        TransactionService.getAll(yearMonth)
            .then((response) => {
                setTransaction(response.data);
                //  console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });

    };

    const MyComponent = styled('div')({
        color: 'green',
    });

    const handleOpen = () => {
        const modal = <SimpleModal descricao="teste" />
        return modal
    }




    return (
        <div component={Paper}>
            <SimpleModal />
            <br></br>
            <div >
                Qtde: {transactionCount}<br></br>
                Total:  {formatNumber(totalTransaction)} <br></br>
                Despesas:   {formatNumber(totalExpenses)}<br></br>
                Receitas:  {formatNumber(totalIncome)}<br></br>


            Período:
            <Select value={yearMonth} onChange={handSelectYearMonth} labelId="label" id="select" className="SelectYear" style={{ width: '200px' }}>

                    {PERIODS.map((period) => {
                        return (
                            <MenuItem key={period} value={period}>
                                {period}
                            </MenuItem>
                        )
                    })}
                </Select>

            </div>
            <br></br>
            <SimpleChart Expenses={totalExpenses} Income={totalIncome} />
            <br></br>



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
                                <StyledTableCell align="left"><EditIcon onClick={() => { }} /> <DeleteForeverIcon /> </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div >
    );
}

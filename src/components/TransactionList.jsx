import React, { useState, useEffect } from 'react';

import TransactionService from '../services/TransactionService'
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SimpleTable from '../components/SimpleTable'

import Paper from '@material-ui/core/Paper';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import { PERIODS } from '../uteis/periods'


const TransactionList = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(86),
                height: theme.spacing(30),
                padding: theme.spacing(2),
            },
        },
    }));

    const MyComponent = styled('div')({
        color: 'green',
    });

    const [transaction, setTransaction] = useState([]);
    const [yearMonth, setYearMonth] = useState(PERIODS[0]);
    const [transactionCount, setTransactionCount] = useState(0);
    const [transactionIncome, setTransactionIncome] = useState(0);
    const [transactionExpense, setTransactionExpense] = useState(0);
    const [transactionBalance, setTransactionBalance] = useState(0);

    useEffect(() => {

        retrieveTransaction();
        setTransactionCount(transaction.length)
    }, [yearMonth])



    const handSelectYearMonth = (event) => {
        setYearMonth(event.target.value);

    };

    const retrieveTransaction = () => {
        TransactionService.getAll(yearMonth)
            .then((response) => {
                setTransaction(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });

    };

    const classes = useStyles();
    return (
        <div>

            <div>

                {transactionCount
                }


            </div>
            YEAR-MONTH
            <Select value={yearMonth} onChange={handSelectYearMonth} labelId="label" id="select" className="SelectYear" style={{ width: '200px' }}>

                {PERIODS.map((period) => {
                    return (
                        <MenuItem key={period} value={period}>
                            {period}
                        </MenuItem>
                    )
                })}
            </Select>
            {
                transaction.map((dados) => (
                    <div className={classes.root} key={dados._id}>
                        <Paper elevation={1}   >
                            <IconButton aria-label="delete">
                                {(dados.type === '-')
                                    ? <RemoveCircleOutlineIcon color='error' fontSize="large" />
                                    : <MyComponent><AddCircleOutlineIcon fontSize="large" /></MyComponent>
                                }

                            </IconButton>
                            <h5>{dados.yearMonth}
                                {dados.description}
                            </h5>
                        </Paper>
                    </div>

                ))
            }
}
            }
            <SimpleTable dados={transaction} />
        </div >
    )
};
export default TransactionList; 
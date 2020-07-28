import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


import TransactionDataService from '../services/TransactionService'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
        padding: '10px',
    },
}));

export default function LayoutTextFields(props) {

    const initialTransactionState = {
        _id: null,
        description: '',
        category: '',
        year: '',
        month: '',
        day: '',
        yearMonth: '',
        yearMonthDay: '',
        type: '-',
        value: '',
        type: '-',
    }

    const [transaction, setTransaction] = useState(initialTransactionState)


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTransaction({ ...transaction, [name]: value });
    };

    const handleInputChangeDate = (event) => {
        let nDate = new Date(event.target.value);
        let day = nDate.getUTCDate()
        let month = (nDate.getUTCMonth() + 1).toString().padStart(2, '0')
        let year = nDate.getUTCFullYear()
        let yearMonth = year + "-" + month
        let yearMonthDay = year + "-" + month + "-" + day
        setTransaction({ ...transaction, day: day, month: month, year: year, yearMonth: yearMonth, yearMonthDay: yearMonthDay });
    }

    const saveTransaction = () => {
        var data = {
            description: transaction.description,
            category: transaction.category,
            year: transaction.year,
            month: transaction.month,
            day: transaction.day,
            type: transaction.type,
            value: parseFloat(transaction.value),
            yearMonth: transaction.yearMonth,
            yearMonthDay: transaction.yearMonthDay
        }
        TransactionDataService.create(data)
            .then((response) => {
                setTransaction({
                    _id: response.data.id,
                    description: response.data.description,
                    category: response.data.category,
                    year: response.data.year,
                    month: response.data.month,
                    value: response.data.value,
                    day: response.data.day,
                    type: response.data.type,
                    yearMonth: response.data.yearMonth,
                    yearMonthDay: response.data.yearMonthDay
                });

                setTransaction(initialTransactionState)

                alert(response.data.message)
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const newTransaction = () => {
        setTransaction(initialTransactionState);

    };

    useEffect(() => {
        newTransaction()
    }, [])



    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <FormControl component="fieldset">
                    <FormLabel >Tipo Lançamento</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel
                            value="-"
                            name="type"
                            control={<Radio color="secondary" />}
                            onChange={handleInputChange}
                            label="Despesa"
                            labelPlacement="left"
                            focus
                        />
                        <FormControlLabel
                            value="+"
                            name="type"
                            control={<Radio color="primary" />}
                            onChange={handleInputChange}
                            label="Receita" />
                    </RadioGroup>

                </FormControl>
            </div>
            <div>
                <TextField
                    id="outlined-full-width"
                    label="Descrição"
                    style={{ margin: 8 }}
                    value={transaction.description}
                    helperText="Informar a descrição do lançamento"
                    fullWidth
                    margin="normal"
                    required
                    onChange={handleInputChange}
                    name="description"
                    value={transaction.description}
                />
                <TextField
                    label="Categoria"
                    id="outlined-margin-none"
                    fullWidth
                    helperText="Categoria do lançamento"
                    style={{ margin: 8 }}
                    margin="normal"
                    onChange={handleInputChange}
                    name="category"
                    value={transaction.category}
                />

                <TextField
                    label="Valor"
                    id="outlined-margin-none"
                    fullWidth
                    style={{ margin: 8 }}
                    margin="normal"
                    helperText="Valores em [BRL] R$"
                    onChange={handleInputChange}
                    name="value"
                    value={transaction.value}
                />

                <TextField
                    id="date"
                    type="date"
                    defaultValue="2020-07-25"
                    onChange={handleInputChangeDate}
                    name="date"
                />
            </div>
            <br></br>
            <Button onClick={saveTransaction} variant="contained" fullWidth="true" color="primary" >
                Salvar
             </Button>
        </div>
    );
}

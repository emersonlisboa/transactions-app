import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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




const addTransaction = () => {
    const initialTransactionState = {
        _Id = null,
        description= '',
        category= '',
        year= '',
        month= '',
        day= '',
        yearMonth= '',
        yearMonthDay= '',
    }

    const [transaction, setTransaction] = useState(initialTransactionState)
    const [state, setstate] = useState(initialState)

    const saveTransaction = () => {


    }

    export default function LayoutTextFields(props) {
        const classes = useStyles();
        const desc = props.desc
        return (
            <div className={classes.root}>
                <div>

                    <FormControl component="fieldset">
                        <FormLabel >Tipo Lançamento</FormLabel>
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <FormControlLabel
                                value="top"
                                control={<Radio color="secondary" />}
                                label="Despesa"
                                labelPlacement="left"
                            />
                            <FormControlLabel
                                value="end"
                                control={<Radio color="primary" />}
                                label="Receita" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id="outlined-full-width"
                        label="Descrição"
                        style={{ margin: 8 }}
                        value={desc}
                        helperText="Informar a descrição do lançamento"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Categoria"
                        id="outlined-margin-none"
                        fullWidth
                        helperText="Categoria de lançamento"
                        style={{ margin: 8 }}
                        margin="normal"

                    />

                    <TextField
                        label="Valor"
                        id="outlined-margin-none"
                        fullWidth
                        style={{ margin: 8 }}
                        margin="normal"
                        helperText="Valores em BRL R$"
                    />

                    <TextField
                        id="date"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <br></br>
                <Button onclick={saveTransaction} variant="contained" fullWidth="true" color="primary" >
                    Salvar
             </Button>
            </div>
        );
    }

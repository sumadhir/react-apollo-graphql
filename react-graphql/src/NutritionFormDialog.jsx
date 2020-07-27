import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';

export default function NutritionFormDialog(props) {
    const {isDialogOpen, showHideDialog} = props;
    const [dessert, setDessert] = useState();
    const [calories, setCalories] = useState();
    const [fat, setFat] = useState();
    const [carb, setCarb] = useState();
    const [protein, setProtein] = useState();
    const [showAlert, setAlert] = useState(false);

    const resetValue = ()=>{
        setDessert(undefined);
        setCalories(undefined);
        setFat(undefined);
        setCarb(undefined);
        setProtein(undefined);
    }


    const onSubmit = (e)=> {
        if(dessert && calories && fat && carb && protein){
            const data = {
                dessert,
                nutritionInfo : {
                    calories,
                    fat,
                    carb,
                    protein
                }
              }
            props.onSubmit(data);
            showHideDialog();
            resetValue();
        } else {
            setAlert(true);
            setTimeout(()=>{
                setAlert(false);
            },4000);
        }

    }

    return (
        <div>
            <Dialog open={isDialogOpen} onClose={showHideDialog} aria-labelledby='form-dialog-title'>
                {showAlert && <Alert variant="filled" severity="error">All fields are required!</Alert>}
                <DialogTitle id='form-dialog-title'>Add a dessert</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill all the details before you submit
                    </DialogContentText>
                    <TextField
                        id='dessert'
                        name='dessert'
                        label='Desert Name*'
                        style={{ margin: 8 }}
                        placeholder='Enter Desert Name'
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant='outlined'
                        onChange={(e)=>{setDessert(e.target.value)}}
                        required
                    />
                    <TextField
                        type='number'
                        id='calories'
                        name='calories'
                        label='Calories*'
                        style={{ margin: 8 }}
                        placeholder='Enter a value'
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant='outlined'
                        onChange={(e)=>{setCalories(e.target.value)}}
                        required
                    />
                    <TextField
                        type='number'
                        id='fat'
                        name='fat'
                        label='Fat*'
                        style={{ margin: 8 }}
                        placeholder='Enter a value'
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant='outlined'
                        onChange={(e)=>{setFat(e.target.value)}}
                        required
                    />
                    <TextField
                        type='number'
                        id='carb'
                        name='carb'
                        label='Carbs*'
                        style={{ margin: 8 }}
                        placeholder='Enter a value'
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant='outlined'
                        onChange={(e)=>{setCarb(e.target.value)}}
                        required
                    />
                    <TextField
                        type='number'
                        id='protein'
                        name='protein'
                        label='Protein*'
                        style={{ margin: 8 }}
                        placeholder='Enter a value'
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant='outlined'
                        onChange={(e)=>{setProtein(e.target.value)}}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={showHideDialog} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color='primary'>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

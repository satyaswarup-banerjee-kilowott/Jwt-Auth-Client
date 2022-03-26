import React, { useState } from 'react'
import axios from 'axios';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Notification from './Notification';


const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
const headerStyle = { margin: 0 }
const avatarStyle = { backgroundColor: '#1bbd7e' }
const marginTop = { marginTop: 8 }

 function Signup() {

    
    const [notify,setNotify] = useState({isOpen:false, message:'', type:''})

    const initialValuesCreate = {
      
        username:'',
        password:''
        
    
        }

    const [create, setCreate] = React.useState(initialValuesCreate);
    const OnValueChangeCreate = async(event) =>{

      const {username,password} = create;
 
          setCreate({...create, [event.target.name]: event.target.value});
          console.log(create);
          
        }


    const onSubmit = () => {

    
       
       
        axios.post("https://jwt-auth-kilowott.herokuapp.com/register", create).then(() => {
            
            setNotify({
                isOpen:true,
                message:'Succesfully signed up',
                type: 'success'
            })

            }).catch(err => {
            console.log(err);
            setNotify({
                isOpen:true,
                message:'Error occured',
                type: 'error'
            })
        })
    }
    
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Username' placeholder="Enter your username" name='username' onChange={OnValueChangeCreate} />
                    <TextField fullWidth label='Password' type='password' placeholder="Enter your password" name='password' onChange={OnValueChangeCreate}/>
                  
                    <Button style={marginTop} variant='contained' color='primary' onClick={onSubmit}   >Sign up</Button>
                </form>
            </Paper>
            <Notification
            notify={notify}
            setNotify={setNotify}
        
            />
        </Grid>
    )
}

export default Signup;
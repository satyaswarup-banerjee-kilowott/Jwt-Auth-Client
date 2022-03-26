import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get("https://jwt-auth-kilowott.herokuapp.com/protected", {
            headers: {
                Authorization: token,
            }
        }).then(res => {
            console.log(res)
            navigate('/protected')
        }).catch(err => {
            console.log(err);
            navigate('/login')
        })
    }, [])

    const submit = () => {
        console.log(username, password)
        axios.post("https://jwt-auth-kilowott.herokuapp.com/login", { username, password }).then(user => {
            console.log(user);
            sessionStorage.setItem('token', user.data.token)
            navigate('/protected')
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        // <div>
        //     <input type="text" placeholder="Enter Username" value={username} onChange={event => setUsername(event.target.value)} />
        //     <input type="password" placeholder="Enter Password" value={password} onChange={event => setPassword(event.target.value)} />
        //     <button onClick={submit}>Submit</button>
        // </div>


        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' value={username} onChange={event => setUsername(event.target.value)} fullWidth required/>
                <TextField label='Password' placeholder='Enter password' value={password} onChange={event => setPassword(event.target.value)} type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' onClick={submit} variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Dont have an account ?
                     <Link href='/signup' >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login

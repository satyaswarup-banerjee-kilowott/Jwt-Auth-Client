import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Button} from '@material-ui/core'

const btnstyle={margin:'8px 0'}

function Protected() {
    let navigate = useNavigate()
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get("https://jwt-auth-kilowott.herokuapp.com/protected", {
            headers: {
                Authorization: token,
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err);
            navigate('/')
        })
    }, [])


    const logout = () => {
        
        sessionStorage.clear();
        navigate('/')

    }
    return (
        <div>
            <h1>User Authorized</h1>
            <Button type='submit' color='primary' onClick={logout} variant="contained" style={btnstyle} >Sign out</Button>
        </div>
    )
}

export default Protected

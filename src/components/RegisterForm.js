import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import useSignUpForm from '../hooks/RegisterHooks'
import {register, login, checkUserAvailable} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { Button, TextField, Grid } from '@material-ui/core';

function RegisterForm({history}) {
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useContext(MediaContext);
    const doRegister = async () => {
        try{
            await checkUserAvailable(inputs.username);
            await register(inputs);
            //kirjaudu automaagisesti
            const userdata = await login(inputs);
            setUser(userdata.user);
            //console.log(user);
            //tallenna token
            localStorage.setItem('token', userdata.token);
            //siirry etusivulle
            history.push('/home');
        }catch(e){
            //virheilmo
            console.log(e.message);
            //näytä käyttäjälle
        }
    };
    const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);
    return (
        <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <Grid>
            <TextField 
            type="text"
            name="username"
            label="Username"
            onChange={handleInputChange}
            value={inputs.username}
            />
            </Grid>
            <Grid>
            <TextField 
            type="password"
            name="password"
            label="Password"
            onChange={handleInputChange}
            value={inputs.password}
            />
            </Grid>
            <Grid>
            <TextField 
            type="email"
            name="email"
            label="Email"
            onChange={handleInputChange}
            value={inputs.email}
            />
            </Grid>
            <Grid>
            <TextField 
            type="email"
            name="full_name"
            label="Full name"
            onChange={handleInputChange}
            value={inputs.full_name}
            />
            </Grid>
            <Button color="primary" type="submit">Register</Button>
            
        </form>
        </>
    )
}

RegisterForm.propTypes = {
    history: PropTypes.object,
}

export default withRouter(RegisterForm);

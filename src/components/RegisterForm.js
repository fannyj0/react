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
        <Grid container>
            <Grid>
                <h1>Register</h1>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid container item>
                            <TextField 
                            fullWidth
                            type="text"
                            name="username"
                            label="Username"
                            onChange={handleInputChange}
                            value={inputs.username}
                        />
                        </Grid>
                        <Grid container item>
                            <TextField 
                            fullWidth
                            type="password"
                            name="password"
                            label="Password"
                            onChange={handleInputChange}
                            value={inputs.password}
                        />
                        </Grid>
                        <Grid container item>
                            <TextField 
                            fullWidth
                            type="email"
                            name="email"
                            label="Email"
                            onChange={handleInputChange}
                            value={inputs.email}
                        />
                        </Grid>
                        <Grid container item>
                            <TextField 
                            fullWidth
                            type="email"
                            name="full_name"
                            label="Full name"
                            onChange={handleInputChange}
                            value={inputs.full_name}
                        />
                        </Grid>
                        <Grid container item>
                            <Button 
                                fullWidth 
                                color="secondary" 
                                variant="contained" 
                                type="submit">
                                    Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}

RegisterForm.propTypes = {
    history: PropTypes.object,
}

export default withRouter(RegisterForm);

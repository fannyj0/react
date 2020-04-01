import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/RegisterHooks';
import {checkUserAvailable, login, register} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {Button, TextField, Grid} from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const RegisterForm = ({history}) => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(MediaContext);
//errorMessage state {username: '', password: '', email: ''}
const alkuarvot = {
    username: undefined,
    password: undefined,
    email: undefined,
    full_name: undefined,
};
const [errorMessage, setErrorMessage] = useState(alkuarvot); 

const handleBlur = async (evt) =>{
    evt.persist();
    try{
    const response = await checkUserAvailable(evt.target.value);
    console.log(response);
        if(!response.available){
            setErrorMessage((errorMessage) => {
                return{
                ...errorMessage,
                username: response.username + ' is not available'
            };
        });
      }
    } catch(e){
        console.log(e.message);
    }
}; 

  const doRegister = async () => {
    try {
      await checkUserAvailable(inputs.username);
      await register(inputs);
      // kirjaudu automaagisesti
      const userdata = await login(inputs);
      setUser(userdata.user);
      // console.log(user);
      // tallenna token
      localStorage.setItem('token', userdata.token);
      // siirry etusivulle
      history.push('/home');
    } catch (e) {
      console.log(e.message);
      // TODO: näytä virhe
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);
  return (
    <Grid container>
      <Grid item>
        <h1>Register</h1>
      </Grid>
      <Grid item>
        <ValidatorForm 
        onSubmit={handleSubmit}  
        instantValidate={false}
        noValidate
        >
          <Grid container>
            <Grid container item>
              <TextValidator
                fullWidth
                type="text"
                name="username"
                label="Username"
                onChange={handleInputChange}
                value={inputs.username}
                helperText={errorMessage.username}
                error={errorMessage.username ? true : false}
                onBlur={handleBlur}
                validators={['required', 'minStringLength:3']}
                errorMessages={['this field is required', 'minimum 3 characters']}
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
                type="password"
                name="confirm"
                label="Confirm password"
                onChange={handleInputChange}
                value={inputs.confirm}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="email"
                name="email"
                label="Email"
                onChange={handleInputChange}
                value={inputs.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
            </Grid>

            <Grid container item>
              <TextField
                fullWidth
                type="text"
                name="full_name"
                label="Full name"
                onChange={handleInputChange}
                value={inputs.full_name}
              />
            </Grid>

            <Grid container item>
              <Button fullWidth
                color="secondary"
                type="submit"
                variant="contained">
                Register
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

RegisterForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(RegisterForm);

import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Button} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  show: {
    paddingTop: '20%',
    paddingRight: '20%',
  },
}));

const BackButton = ({history}) => {
  const classes = useStyles();
  return (
    <Button
    className={classes.show}
      startIcon={<ArrowBackIcon/>}
      onClick={() => {
        history.goBack();
      }}
    >
      Back
    </Button>
  );
};


BackButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(BackButton);

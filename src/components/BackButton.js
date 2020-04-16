import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Button} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  show: {
    position: 'fixed',
    right: '70%',
    top: '20%',
  },
}));

const BackButton = ({history}) => {
  const classes = useStyles();
  return (
    <div className={classes.show}>
    <Button
      startIcon={<ArrowBackIcon/>}
      onClick={() => {
        history.goBack();
      }}
    >
      Back
    </Button>
    </div>
  );
};


BackButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(BackButton);

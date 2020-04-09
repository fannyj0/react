import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BackButton = (history) => {
    return(
        <Button
            startIcon={<ArrowBackIcon/>}
            onClick={() => {
            history.goBack();
          }}
        >
          Back
        </Button>
    )
};

BackButton.propTypes ={
    history: PropTypes.object,
};

export default BackButton;
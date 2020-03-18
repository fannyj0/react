import React from 'react';
import PropTypes from 'prop-types';
import CatRow from './catRow';

const CatTable = ({media}) => {
  // const {media} = props;
  return (
    <table>
      <tbody>
        {
          media.map((file, index) => <CatRow file={file} key={index}/>)
        }
      </tbody>
    </table>
  );
};

CatTable.propTypes = {
  media: PropTypes.array,
};

export default CatTable;

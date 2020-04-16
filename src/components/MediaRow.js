import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {
  GridListTileBar,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const MediaRow = ({file, myfiles}) => {
  const description = JSON.parse(file.description);
  const classes = useStyles();
  let thumb = 'http://placekitten.com/320/200';
  if (file.thumbnails){
    thumb = mediaUrl + file.thumbnails.w320;
  }
  return (
    <>
      <img
        src={thumb}
        alt={file.title}
        style={
          {
            filter: `
                 brightness(${description.filters.brightness}%)
                 contrast(${description.filters.contrast}%) 
                 saturate(${description.filters.saturation}%)
                 sepia(${description.filters.sepia}%)
                 `,
          }
        }
      />
      <GridListTileBar
        title={file.title}
        subtitle={myfiles ? '' : description.desc}
        actionIcon={
          <>
          <IconButton
            aria-label={`info about ${file.title}`}
            component={RouterLink}
            to={'/single/' + file.file_id}
            className={classes.icon}
          >
            <PageviewIcon fontSize="large"/>
          </IconButton>
          
          {myfiles &&
          <>
            <IconButton
            aria-label={`info about ${file.title}`}
            component={RouterLink}
            to={'/single/' + file.file_id}
            className={classes.icon}
          >
            <CreateIcon fontSize="large"/>
          </IconButton>

          <IconButton
            aria-label={`info about ${file.title}`}
            component={RouterLink}
            to={'/single/' + file.file_id}
            className={classes.icon}
          >
            <DeleteIcon fontSize="large"/>
          </IconButton>
          </>
          }
          </>
          
        }
      />
    </>
    );
};

MediaRow.propTypes = {
  file: PropTypes.object,
  myfiles: PropTypes.bool,
};

export default MediaRow;

import React, {useContext} from 'react';
import { MediaContext } from '../contexts/MediaContext';
import { Card, CardMedia, CardContent, makeStyles, Typography  } from '@material-ui/core';
import {useAvatarImage} from '../hooks/ApiHooks';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 740,
    width: 540,
  },
});

const Profile = () => {
  const classes = useStyles();
  const [user] = useContext(MediaContext);
  const avatar = useAvatarImage(436);
  console.log('avatar', avatar);
  return (
      <>
        {user !== null && avatar.length > 0 &&
          <Card>
            <CardMedia 
            className={classes.media}
            image={mediaUrl + avatar[0].filename}
            title="Avatar image"
            />
            <CardContent>
            <Typography component="h2" variant="h5">Profile</Typography>
            <Typography variant="body2" color="textSecondary">{user.username}</Typography>
            <Typography variant="body2" color="textSecondary">{user.email}</Typography>
            <Typography variant="body2" color="textSecondary">{user.full_name}</Typography>
            </CardContent>
          </Card>
        }
    </>
  );
};

export default Profile;
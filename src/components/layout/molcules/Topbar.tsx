import React, { useState, SFC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '../../../theme';
import { AppBar, Toolbar, Badge, Hidden, IconButton, AppBarProps } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import HomeIcon from '@material-ui/icons/Home'
// import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

type Props = {
  className?: string,
  onSidebarOpen?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  appBarProps?: AppBarProps
}

const Topbar: SFC<Props> = props => {
  const { className, onSidebarOpen, appBarProps } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar
      {...appBarProps}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <HomeIcon />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};


export default Topbar;

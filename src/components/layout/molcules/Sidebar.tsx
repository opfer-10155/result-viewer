import React, { SFC } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { Divider, Drawer } from '@material-ui/core'
import { Theme } from '../../../theme';
import SidebarNav from './SidebarNav'
import pages from '../atoms/pageIcons'


const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

type Props = {
  open?: boolean,
  variant?: "permanent" | "persistent" | "temporary",
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void,
  className?: string
}

const Sidebar: SFC<Props> = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};


export default Sidebar;

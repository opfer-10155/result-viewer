import React, { useState, SFC } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Theme } from '../../theme';
import { useMediaQuery } from '@material-ui/core';
import Sidebar from './molcules/Sidebar';
import Topbar from './molcules/Topbar';
import Footer from './molcules/Footer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

export const MainLayout: SFC = props => {
  const { children } = props;

  const classes = useStyles();
  const theme: Theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;

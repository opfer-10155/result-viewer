import React, { SFC } from 'react';
import { makeStyles } from '@material-ui/styles';

import Topbar from './molcules/MinimalTopbar';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

export const MinimalLayout: SFC = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default MinimalLayout;

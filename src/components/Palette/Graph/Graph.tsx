import React, { SFC, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Grid, Card } from '@material-ui/core';
import { Theme } from '../../../theme';

// -----------style------------
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: 'blue',
    height: 700,
    color: theme.palette.primary.contrastText,
  }
}));


// -----------render------------
export const Graph: SFC = props => {
  const classes = useStyles();
  const space = 2
  return (
    <Card className={classes.root}>

    </Card>
  )
}

export default Graph

import React from 'react'
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Theme } from '../../theme';
import TableList from './TableList'
import ColumnList from './ColumnList'
import _ from 'underscore'
import { SelectedTables, TableMeta, Table, Colnames } from './reducer'

// -----------style------------
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    color: theme.palette.primary.contrastText,
  },
  card: {
    padding: theme.spacing(2),
    color: 'black',// theme.palette.primary.contrastText,
    height: '100%',
  },
  title: {
    fontSize: 14,
  },
  columnList: {
    display: 'flex'
  }
}));

// -----------logic------------
type Props = {
  selectedTables: SelectedTables,
  colnames: Colnames,
  onChangeAxis: (event: React.ChangeEvent<HTMLInputElement>, value: string, direction: string, tableId: number) => void,
  direction: 'X' | 'Y' | 'Z'
}

// type Props = {
//   tables: {
//     id: number,
//     name: string,
//     colnames: []
//   }[],
//   onChangeAxis: (event: React.ChangeEvent<HTMLInputElement>, value: string, direction: string, tableId: number) => void,
//   direction: 'X' | 'Y' | 'Z'
// }


const axis = (table: Table, direction: 'X' | 'Y' | 'Z') => {
  switch(direction) {
    case 'X': return table.X
    case 'Y': return table.Y
    case 'Z': return table.Z
    default: return ''
  }
}

// -----------render------------
export default function ColumnCard(props: Props) {
  const classes = useStyles()
  const {
    selectedTables,
    colnames,
    onChangeAxis,
    direction
  } = props

  return (
    <Card className={classes.card}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Select {direction}
      </Typography>
      <CardContent>
      <div className={classes.columnList}>
      {
        Object.values(selectedTables).map(table => {
          const { id } = table
          return (
            <ColumnList
              label={table.name}
              colnames={colnames[id] || ['empty']}
              selected={axis(table, direction)}
              onChange={(e, value) => onChangeAxis(e, value, direction, id)}
              color={table.color}
              key={id.toString()}
            />
          )
        })
      }
      </div>
      </CardContent>
    </Card>
  )
}

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
import ColumnCard from './ColumnCard'
import _ from 'underscore'
import { SelectedTables, TableMeta, Table, Colnames } from './reducer'

/**
 * テーブルを複数選択
 */
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
  tables: TableMeta[]
  selectedTables: SelectedTables
  colnames: Colnames
  // tableAxises: TableAxises
  // directions: string[]
  onChangeTable: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, table: TableMeta) => void
  onChangeAxis: (event: React.ChangeEvent<HTMLInputElement>, value: string, direction: string, tableId: number) => void
  // onChangeX: (event: React.ChangeEvent<HTMLInputElement>, value: string, key: string) => void
}

// -----------helper------------
const makeColumnList = (
  selectedTables: SelectedTables,
  colnames: Colnames,
  onChangeAxis: (event: React.ChangeEvent<HTMLInputElement>, value: string, direction: string, tableId: number) => void,
  direction: 'X' | 'Y' | 'Z'
) => {
  const axis = (table: Table) => {
    switch(direction) {
      case 'X': return table.X
      case 'Y': return table.Y
      case 'Z': return table.Z
      default: return ''
    }
  }
  return Object.values(selectedTables).map(table => {
    const { id } = table
    return (
      <ColumnList
        label={table.name}
        colnames={colnames[id] || ['X', 'Y', 'Z']}
        selected={axis(table)}
        onChange={(e, value) => onChangeAxis(e, value, direction, id)}
        color={table.color}
        key={id.toString()}
      />
    )
  })
}


// -----------render------------
export default function TableSelectInput(props: Props) {
  const {
    tables,
    selectedTables,
    colnames,
    // tableAxises,
    // directions,
    onChangeTable,
    onChangeAxis
  } = props

  const classes = useStyles()
  const space = 2

  return (
    <div className={classes.root}>
      <Grid container spacing={space}>
        <Grid item xs={3}>
          <Card className={classes.card}>
          {/* <CardHeader title={"Select tables"} /> */}
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Select tables
            </Typography>
            <CardContent>
              <TableList
                tables={tables}
                // isSelected={isSelected}
                selectedTables={selectedTables}
                onChange={onChangeTable}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <ColumnCard
            selectedTables={selectedTables}
            colnames={colnames}
            onChangeAxis={onChangeAxis}
            direction={'X'}
          />
        </Grid>
        <Grid item xs={3}>
          <ColumnCard
            selectedTables={selectedTables}
            colnames={colnames}
            onChangeAxis={onChangeAxis}
            direction={'Y'}
          />
        </Grid>
        <Grid item xs={3}>
          <ColumnCard
            selectedTables={selectedTables}
            colnames={colnames}
            onChangeAxis={onChangeAxis}
            direction={'Z'}
          />
        </Grid>
      </Grid>
    </div>
  )
}

/* {
  Object.keys(selectedTables).map((key) => {
    const table = selectedTables[key]
    return (
      <ColumnList
        label={table.name}
        colnames={table.colnames}
        selected={table.selectedZ}
        onChange={(e, value) => onChangeZ(e, value, key)}
        color={table.color}
        key={key}
      />
    )
  })
} */
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
import { Table, TableMeta } from './reducer'

// TODO 選択したテーブルとカラムの色対応

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
}));

// -----------logic------------
type Props = {
  tables: TableMeta[]
  // isSelected: boolean[]
  selectedTables: {[key: string]: Table}
  // selectedX: string
  // selectedY: string
  // selectedZ: string
  onChangeTable: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
  onChangeX: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void
  onChangeY: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void
  onChangeZ: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void
}

// -----------render------------
export default function TableSelectInput(props: Props) {
  const {
    tables,
    // isSelected,
    selectedTables,
    // selectedX,
    // selectedY,
    // selectedZ,
    onChangeTable,
    onChangeX,
    onChangeY,
    onChangeZ
  } = props

  const classes = useStyles()
  const space = 2
  // const mergedTable = mergeTables(
  //   tables.filter((_, index) => isSelected[index])
  // )
  // const colnames = mergedTable.colnames
  // _.flatten(
  //   tables
  //   .filter((_, index) =>isSelected[index])
  //   .map(table => table.colnames)
  // )
  return (
    <div className={classes.root}>
      <Grid container spacing={space}>
        <Grid item xs={3}>
          <Card className={classes.card}>
          {/* <CardHeader title={"Select tables"} /> */}
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Select tables
              </Typography>
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
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Select X
              </Typography>
            </CardContent>
            {/* {
              Object.keys(selectedTables).map((key) => {
                const table = selectedTables[key]
                return (
                  <ColumnList
                    label={table.name}
                    colnames={table.colnames}
                    selected={table.selectedX}
                    onChange={onChangeX}
                    color={table.color}
                    key={key}
                  />
                )
              })
            } */}
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Select Y
            </Typography>
            {/* {
              Object.keys(selectedTables).map((key) => {
                const table = selectedTables[key]
                return (
                  <ColumnList
                    label={table.name}
                    colnames={table.colnames}
                    selected={table.selectedY}
                    onChange={onChangeY}
                    color={table.color}
                    key={key}
                  />
                )
              })
            } */}
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.card}>
            {/* <ColumnList
              label='z'
              colnames={colnames}
              selected={selectedZ}
              onChange={onChangeZ}
            /> */}
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

import React, { SFC, useReducer, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

import { Theme } from '../../theme'
import TableSelectInput from './TableSelectInput'
import Graph from './Graph/Graph'
import OptionMenu from './OptionMenu'
import reducer from './reducer'
import { useTableMeta } from './hooks'
import Colorizer from './colorizer'
import { getColnamesDiff, getDataDiff } from './diff'

// -----------style------------
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  graphCard: {
    padding: theme.spacing(2),
    // backgroundColor: 'blue',
    height: 700,
    color: theme.palette.primary.contrastText
  }
}))

// -----------render------------
const colorizer = new Colorizer()

export const Palette: SFC = props => {
  const space = 2
  const classes = useStyles();
  const tables = useTableMeta()
  const initialState = {
    selectedTables: {},
    colnames: {},
    dataset: {},
    tableAxises: {},
    zValue: 0,
    viewPF: false, // パレートフロンティアを表示するか
    viewScatter: false // Scatterを表示するか
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className={classes.root}>
      <Grid container spacing={space}>
        <Grid item xs={12}>
          <TableSelectInput
            tables={tables}
            selectedTables={state.selectedTables}
            colnames={state.colnames}
            // isSelected={state.isSelected}
            onChangeTable={(_, checked, table) => {
              if(checked) {
                getColnamesDiff(state.colnames, table.id)
                .then((colnames) => {
                  dispatch({
                    type: 'selectTable',
                    table,
                    color: colorizer.attach(),
                    colnames: colnames
                  })
                })
              }
              else {
                dispatch({
                  type: 'deselectTable',
                  id: table.id
                })
              }
            }}
            onChangeAxis={(_, value, direction, tableId) => {
              getDataDiff(state.selectedTables[tableId], value, direction)
              .then(dataDiff => {
                dispatch({
                  type: 'selectAxis',
                  direction,
                  value,
                  dataDiff,
                  tableId
                })
              })
            }}
          />
        </Grid>

        <Grid item xs={8}>
          <Card className={classes.graphCard}>
            <Graph
              selectedTables={state.selectedTables}
              dataset={state.dataset}
              zValue={state.zValue}
              viewPF={state.viewPF}
              viewScatter={state.viewScatter}
            />
          </Card>
        </Grid>

        <Grid item xs={4}>
          <OptionMenu
            zMin={0}
            zMax={100}
            zValue={state.zValue}
            viewPF={state.viewPF}
            viewScatter={state.viewScatter}
            onChangeViewPF={(_, checked) => dispatch({
              type: 'changeViewPF',
              show: checked,
            })}
            onChangeViewScatter={(_, checked) => dispatch({
              type: 'changeViewScatter',
              show: checked
            })}
            onChangeZValue={(_, value) => dispatch({
              type: 'changeZValue',
              value
            })}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Palette

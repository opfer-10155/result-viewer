import React, { SFC, useReducer, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Theme } from '../../theme';
import TableSelectInput from './TableSelectInput'
import Graph from './Graph/Graph'
import OptionMenu from './OptionMenu'
import reducer from './reducer'
import { useTableMeta } from './hooks'
import Colorizer from './colorizer'
import {meta} from "../../mock/meta/table/all"
// テーブル一覧を取得
// const getTables: () => ITable[] = () => []// async () => []

// const useTables = () => {
//   useEffect()
// }

// -----------style------------
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))

// -----------render------------
const colorizer = new Colorizer()

export const Palette: SFC = props => {
  const space = 2
  const classes = useStyles();
  const tables = meta//useTableMeta()
  const initialState = {
    selectedTables: {},
    // isSelected: tables.map(() => false),
    // xColname: '',
    // yColname: '',
    // zColname: '',
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
            // isSelected={state.isSelected}
            // selectedX={state.xColname}
            // selectedY={state.yColname}
            // selectedZ={state.zColname}
            onChangeTable={(event, checked) => {
              const index = parseInt(event.target.name)
              if(checked) {
                dispatch({
                  type: 'selectTable',
                  table: tables[index],
                  key: index.toString(),
                  color: colorizer.attach()
                })
              }
              else {
                dispatch({
                  type: 'deselectTable',
                  // table: tables[index],
                  // index,
                  key: index.toString()
                })
              }
            }}
            onChangeX={(e, value) => dispatch({
              type: 'selectX',
              value,
              key: e.target.name
            })}
            onChangeY={(e, value) => dispatch({
              type: 'selectY',
              value,
              key: e.target.name
            })}
            onChangeZ={(e, value) => dispatch({
              type: 'selectZ',
              value,
              key: e.target.name
            })}
          />
        </Grid>

        <Grid item xs={8}>
          <Graph />
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

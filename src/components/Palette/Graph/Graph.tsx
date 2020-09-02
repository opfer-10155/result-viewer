import React, { SFC, useState, useEffect } from 'react'
import { Scatter } from 'react-chartjs-2'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx';
import { Theme } from '../../../theme'
import { Table, DataSet } from '../reducer'
import { makeScatterDataSet }  from './chart'

// -----------style------------
const useStyles = makeStyles((theme: Theme) => ({
  root: {
  }
}));


// -----------render------------
type Props = {
  className?: string
  selectedTables: {[key: string]: Table}
  dataset: DataSet
  zValue: any
  viewPF: boolean
  viewScatter: boolean
}

export default function Graph(props: Props) {
  const classes = useStyles();
  const space = 2
  const { className, selectedTables, dataset, zValue, viewPF, viewScatter } = props
  const tables = Object.values(selectedTables)
  const availableTables = tables.filter(table => table.X && table.Y && table.Z)
  // const data = useData(availableTables)
  return (
    <div className={clsx(classes.root, className)}>
      <Scatter
        data={makeScatterDataSet(availableTables, dataset, {viewPF})}
      />
    </div>
  )
}

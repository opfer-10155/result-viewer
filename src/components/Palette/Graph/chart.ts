// import { getParetoFrontier } from 'pareto-frontier'
import { Table, DataSet } from '../reducer'

type Point = {
  x: number,
  y: number
}

type Dataframe = {[key: string]: number}[]

type Option = {}

const makePoints: (table: Table, data: Dataframe) => Point[]
= (table, data) => {
  const { X, Y, Z, id } = table
  return data.map((row) => (
    { x: row[X], y: row[Y] }
  ))
}

const makeScatterData = (table: Table, data: Dataframe) => {
  return {
    label: table.name,
    pointBackgroundColor: table.color,
    pointRadius: 2,
    data: makePoints(table, data)
  }
}

export const makeScatterDataSet = (tables: Table[], tableData: DataSet, options: Option) => {
  return {
    labels: ['Scatter'],
    datasets: tables.map(
      table => makeScatterData(table, tableData[table.id] || [])
    )
  }
}

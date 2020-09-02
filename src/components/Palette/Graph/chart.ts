import { Table, DataSet } from '../reducer'
import { getParetoFrontier } from 'pareto-frontier'

type Point = {
  x: number,
  y: number
}

type Dataframe = {[key: string]: number}[]

type Option = {
  viewPF: boolean
}

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
    backgroundColor: table.color,
    borderColor: table.color,
    pointRadius: 2,
    pointBackgroundColor: table.color,
    data: makePoints(table, data)
  }
}

const makeParetoFrontier = (table: Table, data: Dataframe) => {
  const { X, Y, Z, id, name } = table
  const points = data.map(row => [row[X], row[Y]])
  const pf = getParetoFrontier(points, { optimize: 'bottomLeft' })
  return {
    type: 'line',
    label: `${name} pareto-frontier`,
    backgroundColor: table.color,
    borderColor: table.color,
    pointBackgroundColor: table.color,
    pointRadius: 4,
    fill: false,
    data: pf.map(p => ({x: p[0], y: p[1]}))
  }
}

export const makeScatterDataSet = (tables: Table[], tableData: DataSet, options: Option) => {
  const { viewPF } = options
  return {
    labels: ['Scatter'],
    datasets: [
      ...tables.map(
        table => makeScatterData(table, tableData[table.id] || [])
      ),
      ...viewPF ? tables.map(
        table => makeParetoFrontier(table, tableData[table.id])
      ) : []
    ]
  }
}

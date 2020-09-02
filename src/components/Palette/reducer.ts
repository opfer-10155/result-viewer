import _ from 'underscore'
import { getTableAxises } from '../../api'

// --------- Base Types -----------
export type TableMeta = {
  id: number
  name: string
}

export type Colnames = {
  [id: number]: string[]
}

export type DataSet = {
  [id: number]: {[key: string]: number}[]
}

// export type TableAxises = {
//   [id: number]: {
//     [direction: string]: string
//   }
// }

export type Table = {
  id: number
  name: string
  // colnames: string[]
  X: string
  Y: string
  Z: string
  color: string
}

export type SelectedTables = {
  [id: number]: Table
}

// ---------helper function----------
// const getColnames: (id: number) => string[]
// = (id) => {
//   const api = async () => {
//     const axises = await getTableAxises(id)
//     return axises
//   }
//   return api()
// }

// --------- State -----------
export type State = {
  selectedTables: SelectedTables,
  colnames: Colnames,
  dataset: DataSet
  // tableAxises: TableAxises,
  zValue: any,
  viewPF: boolean, // パレートフロンティアを表示するか
  viewScatter: boolean // Scatterを表示するか
}

// --------- Action -----------
export type Action = {
  type: 'selectTable'
  table: TableMeta
  color: string
  colnames: string[]
} |
{
  type: 'deselectTable'
  id: number
} |
{
  type: 'selectAxis'
  direction: string
  value: string
  tableId: number
  dataDiff: {[key: string]: number}[]
} |
{
  type: 'changeZValue'
  value: any
} |
{
  type: 'changeViewPF'
  show: boolean
} |
{
  type: 'changeViewScatter'
  show: boolean
} | {
  type: 'setColnames',
  table: TableMeta,
  colnames: string[]
}

// -----------  reducer ------------
export const reducer: (state: State, action: Action) => State
= (state, action) => {
  switch(action.type) {
    case 'selectTable': {
      const { table, color } = action
      const id = table.id
      const selectedTables = {...state.selectedTables}
      const newTable: Table = {
        ...table,
        X: '',
        Y: '',
        Z: '',
        color,
      }
      selectedTables[id] = newTable

      const colnames = {...state.colnames}
      colnames[id] = action.colnames

      return {
        ...state,
        selectedTables,
        colnames
      }
    }
    case 'deselectTable': {
      const { id } = action
      const selectedTables = {...state.selectedTables}
      delete selectedTables[id]
      return {
        ...state,
        selectedTables
      }
      // if (state.isSelected[action.index]) {
      //   const selectedTables = _.omit({...state.selectedTables}, action.key)
      //   const new_isSelected = [...state.isSelected]
      //   new_isSelected[action.index] = false
      //   return {
      //     ...state,
      //     selectedTables, //: tables.filter((_, index) => new_isSelected[index]), //[...tables, action.table],
      //     isSelected: new_isSelected
      //   }
      // }
      // else {
      //   return {...state}
      // }
    }
    case 'selectAxis': {
      const { tableId, value, direction, dataDiff } = action
      const selectedTables = {...state.selectedTables}
      const table = selectedTables[tableId] || {}
      if (direction === 'X') table.X = value
      else if (direction === 'Y') table.Y = value
      else if (direction === 'Z') table.Z = value

      const dataset = {...state.dataset}
      if (dataDiff.length > 0) dataset[tableId] = dataDiff

      return {
        ...state,
        selectedTables,
        dataset
      }
    }
    case 'changeZValue': {
      return {
        ...state,
        zValue: action.value
      }
    }
    case 'changeViewPF': {
      return {
        ...state,
        viewPF: action.show
      }
    }
    case 'changeViewScatter': {
      return {
        ...state,
        viewScatter: action.show
      }
    }
    default: {
      return {...state}
    }
  }
}

export default reducer

import _ from 'underscore'
import { colors } from '@material-ui/core'

// --------- Base Types -----------
export type TableMeta = {
  name: string
  colnames: string[]
}

export type Table = {
  name: string
  colnames: string[]
  selectedX: string
  selectedY: string
  selectedZ: string
  color: string
}

// --------- State -----------
export type State = {
  // tables: TableMeta[],
  selectedTables: {[key: string]: Table},
  // isSelected: boolean[],
  // xColname: string,
  // yColname: string,
  // zColname: string,
  // xColname: {[key: string]: string},
  // yColname: {[key: string]: string},
  // zColname: {[key: string]: string},
  zValue: any,
  viewPF: boolean, // パレートフロンティアを表示するか
  viewScatter: boolean // Scatterを表示するか
}

// --------- Action -----------
export type Action = {
  type: 'selectTable'
  // index: number
  key:   string
  table: TableMeta
  color: string
} |
{
  type: 'deselectTable'
  // index: number
  key:   string
  // table: TableMeta
} |
{
  type: 'selectX'
  value: string
  key: string
} |
{
  type: 'selectY'
  value: string
  key: string
} |
{
  type: 'selectZ'
  value: string
  key: string
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
}
// | {
//   type: 'setTables',
//   tables: TableMeta[]
// }

// export const mergeTables: (tables: Table[]) => Table
// = (tables: Table[]) => {
//   const table: Table = {
//     name: 'merged',
//     colnames: [],
//     body: {}
//   }
//   tables.forEach(t => {
//     table.name = table.name+`(${t.name})`
//     t.colnames.forEach(colname => {
//       table.colnames.push(t.name+`.${colname}`)
//       table.body[t.name+colname] = t.body[colname]
//     })
//   })
//   return table
// }


// -----------  reducer ------------
export const reducer: (state: State, action: Action) => State
= (state, action) => {
  switch(action.type) {
    // case 'setTables': {
    //   const tables = [...action.tables]
    //   return {
    //     ...state,
    //     tables
    //   }
    // }
    case 'selectTable': {
      if (state.selectedTables[action.key]) {
        return {...state}
      }
      else {
        const selectedTables = {...state.selectedTables}
        const newTable = {
          ...action.table,
          color: action.color,
          selectedX: '',
          selectedY: '',
          selectedZ: ''
        }
        selectedTables[action.key] = newTable
        return {
          ...state,
          selectedTables
        }
      }
      // if (state.isSelected[action.index]) {
      //   return {...state}
      // }
      // else {
      //   const selectedTables = {...state.selectedTables}
      //   selectedTables[action.key] = action.table

      //   const new_isSelected = [...state.isSelected]
      //   new_isSelected[action.index] = true

      //   return {
      //     ...state,
      //     selectedTables, // tables.filter((_, index) => new_isSelected[index]), //[...tables, action.table],
      //     isSelected: new_isSelected
      //   }
      // }
    }
    case 'deselectTable': {
      if (state.selectedTables[action.key]) {
        const selectedTables = _.omit({...state.selectedTables}, action.key)
        return {
          ...state,
          selectedTables
        }
      }
      else {
        return {...state}
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
    case 'selectX': {
      const selectedTables = {...state.selectedTables}
      const table = selectedTables[action.key]
      table.selectedX = action.value
      return {
        ...state,
        selectedTables
      }
    }
    case 'selectY': {
      const selectedTables = {...state.selectedTables}
      const table = selectedTables[action.key]
      table.selectedY = action.value
      return {
        ...state,
        selectedTables
      }
      // return {
      //   ...state,
      //   yColname: action.value
      // }
    }
    case 'selectZ': {
      const selectedTables = {...state.selectedTables}
      const table = selectedTables[action.key]
      table.selectedZ = action.value
      return {
        ...state,
        selectedTables
      }
      // return {
      //   ...state,
      //   zColname: action.value
      // }
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

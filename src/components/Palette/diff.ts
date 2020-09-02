import { getTableAxises, getData } from '../../api'
import { Colnames, DataSet, Table } from './reducer'
import _ from 'underscore'
/**
 * 必要ならばcolnamesを取得し、そのcolnamesを返す
 * @params {Colnames} colnames
 * @params {number} tableId
 * @returns {string[]}
 */
export const getColnamesDiff = async (colnames: Colnames, tableId: number) => {
  if (colnames[tableId] && colnames[tableId].length > 0) {
    return colnames[tableId]
  }
  else {
    return getTableAxises(tableId)
  }
}

/**
 * 新しいテーブルや軸に対し、dataを取得し、新しいデータセットを返す
 * @params {DataSet} dataframes 現在のデータセット
 * @params {tables} グラフに使うテーブル
 * @returns {DataSet}
 */
export const getDataDiff = async (table: Table, newAxis: string, direction: string) => {
  const {id, X, Y, Z} = table
  switch(direction) {
    case 'X': {
      if (Y && Z) return await getData(id, newAxis, Y, Z)
      else return []
    }
    case 'Y': {
      if (X && Z) return await getData(id, X, newAxis, Z)
      else return []
    }
    case 'Z': {
      if (X && Y) return await getData(id, X, Y, newAxis)
      else return []
    }
    default: return []
  }
}

// export const getDataDiff = async (dataframes: DataSet, tables: Table[]) => {
//   const getDiff = async (table: Table) => {
//     const {id, X, Y, Z} = table
//     const df = dataframes[id] || []
//     const row = df.length > 0 ? df[0] : {}
//     const hasNoDiff = X in row && Y in row && Z in row
//     if (hasNoDiff) {
//       const data = await getData(id, X, Y, Z)
//       return { id, data }
//     }
//     else {
//       return { id, data: df }
//     }
//   }
//   const diff = await Promise.all(tables.map(table => getDiff(table)))
//   const newData: DataSet = {}
//   diff.forEach(v => {
//     const { id, data } = v
//     newData[id] = data
//   })
//   return newData
// }

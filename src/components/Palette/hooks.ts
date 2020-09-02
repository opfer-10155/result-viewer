import { useEffect, useState } from "react"
import _ from 'underscore'
import { TableMeta, Table, DataSet } from './reducer'
import { getNameList } from '../../api'
import { getDataDiff } from './diff'
import { table } from "console"

/**
 * ページ読み込み時にのみ一度だけ、全テーブルの{id, name}を読み込み返す
 * @returns { TableMeta[] } tables テーブルのメタデータの配列
 */
export const useTableMeta = () => {
  const [tables, setTables] = useState<TableMeta[]>([])
  useEffect(() => {
    const getTables = async () => {
      const meta = await getNameList()
      setTables(meta)
    }
    getTables()
  }, [])
  return tables
}

// export const useData = (dataset: DataSet, tables: Table[]) => {
//   const [data, setData] = useState<DataSet>({})
//   console.log(tables)
//   useEffect(() => {
//     getDataDiff(dataset, tables)
//     .then(newData => {
//       setData(newData)
//     })
//   }, [])

//   return data
// }


// export const useTableAxises = (tables: TableMeta[]) => {
//   const [colnames, setColnames] = useState<TableAxises>()
//   // table => [id, colnames]
//   const getColnames = async (table: TableMeta) => {
//     const colnames = await getTableAxises(table.id)
//     return [table.id, colnames]
//   }
//   // [id, colnames] => { id: colnames } => set colnames
//   useEffect(() => {
//     Promise.all(
//       tables.map((table) => getColnames(table))
//     ).then((values) => {
//       setColnames(_.object<TableAxises>(values))
//     })
//   }, [])
// }

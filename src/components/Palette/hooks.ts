import { useEffect, useState } from "react"
import { TableMeta } from './reducer'

// TODO: useEffectを使うとフリーズして死ぬ、なぜだ
export const useTableMeta = () => {
  const [tables, setTables] = useState<TableMeta[]>([])
  useEffect(() => {
    const getTables = async () => {
      const { meta } = await import("../../mock/meta/table/all")
      setTables([...meta])
    }
    getTables()
  })

  return tables
}


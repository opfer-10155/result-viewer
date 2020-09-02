export const getNameList = async () => {
  const { meta } = await import("./mock/namelist/")
  return meta
}

export const getTableAxises = async (id: number) => {
  const { axises } = await import("./mock/axises/")
  return axises[id]
}

export const getData = async (id: number, x: string, y: string, z: string) => {
  const { example } = await import("./mock/data/")
  return example
}

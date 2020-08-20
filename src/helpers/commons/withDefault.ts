export const withDefault = <T>(val: T | undefined, defaultValue: T) => {
  if (val === undefined) return defaultValue
  else return val
}

export default withDefault

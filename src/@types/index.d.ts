declare module 'pareto-frontier' {
  export const getParetoFrontier: (
    points: number[][],
    options: { optimize: string }
  ) => number[][]
}

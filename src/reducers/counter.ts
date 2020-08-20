import { reducerWithInitialState } from 'typescript-fsa-reducers'
import counterActions from '../actions/counter'

export interface ICounterState {
  n_countUp: number
}

const initialState: ICounterState = {
  n_countUp: 0
}

export const counterReducer = reducerWithInitialState(initialState)
.case(counterActions.countUp, (state, payload) => {
  const n = state.n_countUp + 1
  return {n_countUp: n}
})


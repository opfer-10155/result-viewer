// import { combineReducers } from 'redux'
import { ICounterState, counterReducer } from './counter'

export interface IAppState {
  counter: ICounterState
}

// export const reducers = combineReducers<IAppState>({
//   counter: counterReducer
// })

export const reducers = {
  counter: counterReducer
}


export default reducers

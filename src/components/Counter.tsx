import React, { SFC } from 'react'
import { ICounterState } from  '../reducers/counter'
import { ICounterActions } from '../actions/counter'

type Props = ICounterActions & ICounterState

const Counter: SFC<Props> = ({n_countUp, countUp}) => {
  const n = n_countUp
  return (
    <div>
      <h1>{33 * n} - {4 * n}</h1>
      <button onClick={countUp}>ウ　ン　チ　ー　コ　ン　グ</button>
    </div>
  )
}

export default Counter

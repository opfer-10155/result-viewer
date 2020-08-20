import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import CounterComponent from '../components/Counter'
import { IAppState } from '../reducers/index'
import counterActions from '../actions/counter'
import { Action } from 'typescript-fsa';

const mapStateToProps = (state: IAppState) => {
  return {...state.counter}
}
const mapDispatchToProps = (dispatch: Dispatch<Action<{}>>) => {
  return {
    countUp: () => dispatch(counterActions.countUp({}))
  }
}

export const Counter = connect(
  mapStateToProps, mapDispatchToProps
)(CounterComponent)

export default Counter

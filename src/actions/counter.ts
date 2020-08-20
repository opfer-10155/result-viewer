import actionCreatorFactory, { Action } from 'typescript-fsa'
const actionCreater = actionCreatorFactory()

// actionCreater<payload_scheme>(action_type)
/*
commentAtions = {
  action: actionCreater,
  ...
}
*/
export interface ICounterActions {
  countUp: () => Action<{}>
}

const counterActions = {
  countUp: actionCreater<{}>('COUNT_UP')
}

export default counterActions

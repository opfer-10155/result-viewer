// import { createStore } from 'redux'
import createStore from './createStore'
import history from './history'
// import reducers from './reducers/index'

const store = createStore(
  history
)

export default store

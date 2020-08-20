import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { History } from 'history'
import { reducers } from './reducers'

// connected-react-router - action経由でルーティングが可能、push,replace..
// createStoreを拡張 - historyを引数で受け、connected-react-routerの利用を抽象化
export default function createStore(history: History) {
  return reduxCreateStore( // オリジナル createStore の別名
    combineReducers({
      ...reducers,
      router: connectRouter(history),
    }),
    applyMiddleware(
      logger,
      thunk,
      routerMiddleware(history)
    )
  );
}

import { applyMiddleware, compose, createStore } from 'redux';
import { devTools } from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import meteorDatasource from '../middlewares/meteorDatasource';
import meteorSubscription from '../middlewares/meteorSubscription';

const createHistory = require(`history/lib/createBrowserHistory`);
const loggerMiddleware = createLogger();

import rootReducer from '../reducers';
import routes from '../routes';

const middlewares = [
  thunkMiddleware,
  meteorSubscription,
  meteorDatasource,
  loggerMiddleware,
];

const finalCreateStore = compose(
  applyMiddleware(...middlewares),
  reduxReactRouter({ createHistory, routes }),
  devTools()
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}

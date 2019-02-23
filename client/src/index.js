import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { 
  createStore, 
  applyMiddleware, 
  compose, 
  combineReducers 
} from 'redux';
import thunk from 'redux-thunk';

import './fonts.css';
import './index.css';

import App from './App';

import authReducer from './store/reducers/auth';
import productReducer from './store/reducers/product';
import categoryReducer from './store/reducers/category';
import foodnoteReducer from './store/reducers/foodnote';
import userReducer from './store/reducers/user';
import documentReducer from './store/reducers/document';

import * as serviceWorker from './serviceWorker';
import history from './utilities/history';

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  foodnote: foodnoteReducer,
  user: userReducer,
  document: documentReducer,
});

const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
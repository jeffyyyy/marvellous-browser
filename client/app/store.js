import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {client} from './client'
import {routerReducer} from 'react-router-redux'
import {comics} from './components/comics/reducers'
import {creators} from './components/creators/reducers'
import {characters} from './components/characters/reducers'
import {toolbar} from './components/toolbar/reducers'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import multi from 'redux-multi'

const middleware = [
  client.middleware(),
  promiseMiddleware(),
  thunkMiddleware,
  multi
]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(require('redux-freeze'))
  middleware.push(require('redux-logger')
    .createLogger())
}

export const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    routing: routerReducer,
    comics: comics,
    creators: creators,
    characters: characters,
    toolbar: toolbar
  }),
  {},
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() :
      f => f
  )
)

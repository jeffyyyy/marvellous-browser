import propOr from 'ramda/src/propOr'
import pathOr from 'ramda/src/pathOr'
import URLSearchParams from 'url-search-params'
import {
  CHARACTERS_CHANGE_QUERY,
  CHARACTERS_LOAD_FULFILLED,
  CHARACTERS_LOAD_MORE_FULFILLED,
  CHARACTERS_ORDER_NAME_ASC,
  CHARACTERS_UPDATE_NAME_STARTS_WITH
} from './constants'

// eslint-disable-next-line no-undef
const params = new URLSearchParams(location.search.slice(1));
const initialState = {
  data: [],
  orderBy: params.get('orderBy') || CHARACTERS_ORDER_NAME_ASC,
  nameStartsWith: params.get('nameStartsWith') || '',
  limit: params.get('limit') || 12,
  start: params.get('start') || 0
}

const getCharactersFromResponse = pathOr([], ['payload', 'data', 'characters'])

export function characters (
  state = initialState,
  action
) {
  switch (action.type) {

    case CHARACTERS_LOAD_FULFILLED:
      return Object.assign({}, state, {
        data: getCharactersFromResponse(action)
      })

    case CHARACTERS_LOAD_MORE_FULFILLED:
      return Object.assign({}, state, {
        data: [...state.data, ...getCharactersFromResponse(action)]
      })

    case CHARACTERS_CHANGE_QUERY: {
      return Object.assign({}, state, {
        orderBy: propOr(state.orderBy, 'orderBy', action.variables),
        nameStartsWith: propOr(state.nameStartsWith, 'nameStartsWith', action.variables)
      })
    }

    case CHARACTERS_UPDATE_NAME_STARTS_WITH: {
      return Object.assign({}, state, {
        nameStartsWith: action.nameStartsWith
      })
    }

    default:
      return state
  }
}

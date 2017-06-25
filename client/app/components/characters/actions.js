/**
 * Convenience function for triggering an action after a graphql query is completed
 *
 */
import {
  CHARACTERS_CHANGE_QUERY,
  CHARACTERS_LOAD,
  CHARACTERS_LOAD_MORE,
  CHARACTERS_ORDER_NAME_ASC,
  CHARACTERS_UPDATE_NAME_STARTS_WITH
} from './constants'
import {client} from '../../client'
import {gql} from 'react-apollo'
import merge from 'ramda/src/merge'
import clone from 'ramda/src/clone'
import compose from 'ramda/src/compose'
import {browserHistory} from 'react-router'
import {objectToQueryParams} from '../../helpers/objectToQueryParams'

const mergeQueryVariables = compose(merge({
  start: 0,
  limit: 12,
  nameStartsWith: null,
  characterIds: null,
  orderBy: CHARACTERS_ORDER_NAME_ASC
}), clone)

export const CHARACTERS_QUERY = gql`query (
    $start: Int,
    $limit: Int,
    $orderBy: String,
    $nameStartsWith: String
  ) {
    characters(
      start: $start,
      limit: $limit,
      orderBy: $orderBy,
      nameStartsWith: $nameStartsWith
    ) {
      id
      name
      description
      thumbnail
      hasImages
    }
  }
`

export function loadCharacters(queryOptions = {}) {
  return {
    type: CHARACTERS_LOAD,
    payload: client.query({
      query: CHARACTERS_QUERY,
      variables: queryOptions
    })
  }
}

export function loadMoreCharacters(query) {
  return {
    type: CHARACTERS_LOAD_MORE,
    payload: client.query({
      query: CHARACTERS_QUERY,
      variables: query
    })
  }
}

export function updateNameStartsWith(nameStartsWith) {
  return {
    type: CHARACTERS_UPDATE_NAME_STARTS_WITH,
    nameStartsWith
  }
}

export function updateCharactersQuery(variables) {
  const mergedVariables = mergeQueryVariables(variables)
  browserHistory.push(`/characters?${objectToQueryParams(mergedVariables)}`)

  return [
    {
      type: CHARACTERS_CHANGE_QUERY,
      variables
    },
    {
      type: CHARACTERS_LOAD,
      payload: client.query({
        query: CHARACTERS_QUERY,
        variables: mergedVariables
      })
    }
  ]
}

/**
 * Convenience function for triggering an action after a graphql query is completed
 *
 * @TODO Error handling
 */
import {
  CREATORS_CHANGE_QUERY,
  CREATORS_LOAD,
  CREATORS_LOAD_MORE,
  CREATORS_ORDER_FIRSTNAME_ASC,
  CREATORS_UPDATE_NAME_STARTS_WITH
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
  orderBy: CREATORS_ORDER_FIRSTNAME_ASC
}), clone)

export const CREATORS_QUERY = gql`query (
    $start: Int,
    $limit: Int,
    $orderBy: String,
    $nameStartsWith: String
  ) {
    creators(
      start: $start,
      limit: $limit,
      orderBy: $orderBy,
      nameStartsWith: $nameStartsWith
    ) {
      id
      fullName
      suffix
      thumbnail
      hasImages
    }
  }
`

export function loadCreators(queryOptions = {}) {
  return {
    type: CREATORS_LOAD,
    payload: client.query({
      query: CREATORS_QUERY,
      variables: queryOptions
    })
  }
}

export function loadMoreCreators(query) {
  return {
    type: CREATORS_LOAD_MORE,
    payload: client.query({
      query: CREATORS_QUERY,
      variables: query
    })
  }
}

export function updateNameStartsWith(nameStartsWith) {
  return {
    type: CREATORS_UPDATE_NAME_STARTS_WITH,
    nameStartsWith
  }
}

export function updateCreatorsQuery(variables) {
  const mergedVariables = mergeQueryVariables(variables)
  browserHistory.push(`/creators?${objectToQueryParams(mergedVariables)}`)

  return [
    {
      type: CREATORS_CHANGE_QUERY,
      variables
    },
    {
      type: CREATORS_LOAD,
      payload: client.query({
        query: CREATORS_QUERY,
        variables: mergedVariables
      })
    }
  ]
}

import * as actions from './actions'
import * as constants from './constants'
import {client} from '../../client'
import {gql} from 'react-apollo'
import * as R from 'ramda'
import {browserHistory} from 'react-router'
import {objectToQueryParams} from '../../helpers/objectToQueryParams'
let {expect, describe, it, spyOn} = global

describe('Characters actions', () => {

  it('should update characters with name starting with a string', () => {
    const nameStartsWith = 'test'
    const expectedAction = {
      type: constants.CHARACTERS_UPDATE_NAME_STARTS_WITH,
      nameStartsWith
    }
    expect(actions.updateNameStartsWith(nameStartsWith)).toEqual(expectedAction);
  })

  it('should load characters with given options', () => {
    const queryOptions = {
      orderBy: "name",
      start: 0,
      limit: 12,
      nameStartsWith: ""
    }

    const expectedAction = {
      type: constants.CHARACTERS_LOAD,
      payload: client.query({
        query: actions.CHARACTERS_QUERY,
        variables: queryOptions
      })
    }
    expect(actions.loadCharacters(queryOptions)).toEqual(expectedAction);
  })

  it('should load 12 more characters with given options', () => {
    const queryOptions = {
      characterIds: [4,5,6],
      orderBy: "-issueNumber",
      start: 24,
      limit: 12,
      titleStartsWith: "abc"
    }

    const expectedAction = {
      type: constants.CHARACTERS_LOAD_MORE,
      payload: client.query({
        query: actions.CHARACTERS_QUERY,
        variables: queryOptions
      })
    }
    expect(actions.loadMoreCharacters(queryOptions)).toEqual(expectedAction);
  })

  it('update characters collection with given variables', () => {
    spyOn(browserHistory, 'push');

    const variables = {
      orderBy: "name",
      nameStartsWith: "efg"
    }

    const mergedVariables = R.compose(R.merge({
      start: 0,
      limit: 12,
      nameStartsWith: null,
      orderBy: constants.CHARACTERS_ORDER_NAME_ASC
    }), R.clone)(variables)

    const expectedAction = [
      {
        type: constants.CHARACTERS_CHANGE_QUERY,
        variables
      },
      {
        type: constants.CHARACTERS_LOAD,
        payload: client.query({
          query: actions.CHARACTERS_QUERY,
          variables: mergedVariables
        })
      }
    ]

    expect(actions.updateCharactersQuery(variables)).toEqual(expectedAction)
    expect(browserHistory.push).toHaveBeenCalledWith(`/characters?${objectToQueryParams(mergedVariables)}`)
  })

})
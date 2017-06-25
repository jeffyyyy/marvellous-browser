import * as actions from './actions'
import * as constants from './constants'
import {client} from '../../client'
import * as R from 'ramda'
import {browserHistory} from 'react-router'
import {objectToQueryParams} from '../../helpers/objectToQueryParams'
let {expect, describe, it, spyOn} = global

describe('Comics actions', () => {

  it('should update comics with title starting with a string', () => {
    const titleStartsWith = 'test'
    const expectedAction = {
      type: constants.COMICS_UPDATE_TITLE_STARTS_WITH,
      titleStartsWith
    }
    expect(actions.updateTitleStartsWith(titleStartsWith)).toEqual(expectedAction);
  })

  it('should load comics with given options', () => {
    const queryOptions = {
      characterIds: [1,2,3],
      orderBy: "-issueNumber",
      start: 0,
      limit: 12,
      titleStartsWith: ""
    }

    const expectedAction = {
      type: constants.COMICS_LOAD,
      payload: client.query({
        query: actions.COMICS_QUERY,
        variables: R.evolve({
          characterIds: R.map((characterId) => characterId.id)
        })(queryOptions)
      })
    }
    expect(actions.loadComics(queryOptions)).toEqual(expectedAction);
  })

  it('should load 12 more comics with given options', () => {
    const queryOptions = {
      characterIds: [4,5,6],
      orderBy: "-issueNumber",
      start: 24,
      limit: 12,
      titleStartsWith: "abc"
    }

    const expectedAction = {
      type: constants.COMICS_LOAD_MORE,
      payload: client.query({
        query: actions.COMICS_QUERY,
        variables: R.evolve({
          characterIds: R.map((characterId) => characterId.id)
        })(queryOptions)
      })
    }
    expect(actions.loadMoreComics(queryOptions)).toEqual(expectedAction);
  })

  it('update comics collection with given variables', () => {
    spyOn(browserHistory, 'push');
    const variables = {
      characterIds: [4,5,6],
      orderBy: "-issueNumber",
      titleStartsWith: "abc"
    }

    const mergedVariables = R.compose(
      R.evolve({
        characterIds: R.map((characterId) => characterId.id)
      }),
      R.merge({
        start: 0,
        limit: 12,
        titleStartsWith: null,
        characterIds: null,
        orderBy: constants.COMICS_ORDER_ISSUE_NUMBER_DESC
      }), R.clone
    )(variables)

    const expectedAction = [
      {
        type: constants.COMICS_CHANGE_QUERY,
        variables
      },
      {
        type: constants.COMICS_LOAD,
        payload: client.query({
          query: actions.COMICS_QUERY,
          variables: mergedVariables
        })
      }
    ]

    expect(actions.updateComicsQuery(variables)).toEqual(expectedAction)
    expect(browserHistory.push).toHaveBeenCalledWith(`/comics?${objectToQueryParams(mergedVariables)}`)
  })

})
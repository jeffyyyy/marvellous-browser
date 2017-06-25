import React from 'react'
import classNames from 'classnames'
import './CreatorSearch.pcss'
import {
  updateCreatorsQuery,
  updateNameStartsWith
} from '../../../creators/actions'

export function CreatorSearch(props) {
  const {
    dispatch,
    showSearch,
    creators: {
      orderBy,
      nameStartsWith
    }
  } = props

  const searchClass = classNames({
    'creator__search': true,
    'creator__search--show': showSearch
  })

  return (
    <div className={searchClass}>
      <form onSubmit={(event) => {
        event.preventDefault()
        dispatch(updateCreatorsQuery({
          nameStartsWith,
          orderBy
        }))
      }}>
        <div className="creator__search__inputs">
          <input onChange={(event) => dispatch(updateNameStartsWith(event.target.value))}
                 value={nameStartsWith || ''}
                 placeholder="Names that containing"
                 className="creator__search__inputs__input"/>
        </div>
        <button className="creator__search__button">
          Go
        </button>
      </form>
    </div>
  )
}

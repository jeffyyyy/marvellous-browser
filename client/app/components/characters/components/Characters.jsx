import React from 'react'
import CharactersTile from './CharactersTile.jsx'
import pathOr from 'ramda/src/pathOr'
import './Characters.pcss'
import { connect } from 'react-redux'
import { loadCharacters } from '../actions'
import compose from 'ramda/src/compose'
import pick from 'ramda/src/pick'
import { Helmet } from 'react-helmet'

const getCharacters = pathOr([], ['characters', 'data'])
const viewingCharacterId = pathOr(false, ['params', 'id'])

export const getCharactersQueryOptions = compose(pick([
  'orderBy',
  'start',
  'limit',
  'nameStartsWith'
]), pathOr({}, ['characters']))

class CharactersRenderer extends React.Component {

  componentDidMount () {
    this.props.dispatch(loadCharacters(getCharactersQueryOptions(this.props)))
  }

  render () {
    if (viewingCharacterId(this.props)) {
      return this.props.children
    }

    const characters = getCharacters(this.props)
    return (
      <div className="characters">
        <Helmet>
          <title>Characters | Marvellous</title>
        </Helmet>
        {characters.map((character) => <CharactersTile key={character.id}
                                                   character={character}/>)}
      </div>
    )
  }
}

export default connect((state) => {
  return {
    characters: state.characters
  }
})(CharactersRenderer)

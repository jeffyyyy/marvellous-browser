import React from 'react'
import CreatorsTile from './CreatorsTile.jsx'
import pathOr from 'ramda/src/pathOr'
import './Creators.pcss'
import { connect } from 'react-redux'
import { loadCreators } from '../actions'
import compose from 'ramda/src/compose'
import pick from 'ramda/src/pick'
import { Helmet } from 'react-helmet'

const getCreators = pathOr([], ['creators', 'data'])
const viewingCreatorId = pathOr(false, ['params', 'id'])

export const getCreatorsQueryOptions = compose(pick([
  'orderBy',
  'start',
  'limit',
  'nameStartsWith'
]), pathOr({}, ['creators']))

class CreatorsRenderer extends React.Component {

  componentDidMount () {
    this.props.dispatch(loadCreators(getCreatorsQueryOptions(this.props)))
  }

  render () {
    if (viewingCreatorId(this.props)) {
      return this.props.children
    }

    const creators = getCreators(this.props)
    return (
      <div className="creators">
        <Helmet>
          <title>Creators | Marvellous</title>
        </Helmet>
        {creators.map((creator) => <CreatorsTile key={creator.id}
                                           creator={creator}/>)}
      </div>
    )
  }
}

export default connect((state) => {
  return {
    creators: state.creators
  }
})(CreatorsRenderer)

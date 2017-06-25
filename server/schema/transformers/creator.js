import R from 'ramda'
import {transformImage} from './images'

export const transformCreator = (rawCreator) => {
  return R.compose(
    R.assoc('hasImages', !R.contains('image_not_available', R.pathOr('', ['thumbnail', 'path'], rawCreator))),
    R.evolve({
      thumbnail: transformImage,
      comics: R.prop('items')
    }),
    R.converge(
      R.assoc('comicsTotal'),
      [
        R.pathOr(0, ['comics', 'available']),
        R.identity
      ]
    ),
    R.pick([
      'id',
      'fullName',
      'suffix',
      'thumbnail',
      'comics'
    ])
  )(rawCreator)
}


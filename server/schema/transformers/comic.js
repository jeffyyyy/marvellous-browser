import R from 'ramda'
import { transformImage } from './images'
import {cleanString} from '../../helpers/clean-string'

export const transformComic = (rawComic) => {
  return R.compose(
    R.assoc('hasImages', Boolean(R.length(rawComic.images))),
    R.evolve({
      thumbnail: transformImage,
      images: R.map(transformImage),
      characters: R.prop('items'),
      creators: R.prop('items'),
      description: cleanString
    }),
    R.pick([
      'id',
      'title',
      'thumbnail',
      'images',
      'description',
      'variantDescription',
      'characters',
      'creators'
    ])
  )(rawComic)
}

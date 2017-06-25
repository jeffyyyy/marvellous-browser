import DataLoader from 'dataloader'
import R from 'ramda'
import {extractIdFromURI} from '../../helpers/extract-id-from-uri'
import {comicLoader} from './comic'
import {creatorLoader} from './creator'
import {RedisDataLoaderConstructor} from '../../redisDataLoader'

const getComicId = R.compose(
  extractIdFromURI,
  R.prop('resourceURI')
)

const creatorDetailDataLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      const creator = await creatorLoader.load(id)

      creator.comics = await comicLoader.loadMany(R.map(getComicId, creator.comics))

      return creator
    } catch (error) {
      throw new Error(`Failed to fetch creator with id ${id}`)
    }
  }, ids))
}, {
  cache: false
})

export const creatorDetailLoader = new RedisDataLoaderConstructor('creator-detail', creatorDetailDataLoader)

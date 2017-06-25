import DataLoader from 'dataloader'
import {marvel} from '../../marvel'
import R from 'ramda'
import {transformCreator} from '../transformers/creator'
import {RedisDataLoaderConstructor} from '../../redisDataLoader'

const getData = R.pathOr({}, ['data', 0])

const creatorDataLoader = new DataLoader(async (ids) => {
  return Promise.all(R.map(async (id) => {
    try {
      return transformCreator(getData(await marvel.creators.find(id)))
    } catch (error) {
      throw new Error(`Failed to fetch character with id ${id}`)
    }
  }, ids))
}, {
  cache: false
})

export const creatorLoader = new RedisDataLoaderConstructor('creator', creatorDataLoader)


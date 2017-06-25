import DataLoader from 'dataloader'
import { marvel } from '../../marvel'
import R from 'ramda'
import {transformCreator} from '../transformers/creator'
import {RedisDataLoaderConstructor} from '../../redisDataLoader'

const getData = R.propOr({}, 'data')

const creatorsDataLoader = new DataLoader((keySets) => {
  return Promise.all(R.map((keys) => {
    try {
      return marvel.query('creators', JSON.parse(keys))
        .then((response) => R.map(transformCreator, getData(response)))
    } catch (error) {
      throw new Error(`Failed to fetch creators with query ${JSON.stringify(keys, null, 2)}`)
    }
  }, keySets))
}, {
  cache: false
})

export const creatorsLoader = new RedisDataLoaderConstructor('creators', creatorsDataLoader)

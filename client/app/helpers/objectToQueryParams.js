import {compose, reduce, isNil, last, head, toPairs} from 'ramda'

export const objectToQueryParams = compose(reduce((
  params,
  pair
) => {
  if (isNil(last(pair))) {
    return params
  }

  const paramsPair = `${head(pair)}=${encodeURIComponent(last(pair))}`
  if (!params) {
    return paramsPair
  }
  return `${params}&${paramsPair}`
}, ''), toPairs)
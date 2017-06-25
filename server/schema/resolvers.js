import {comicDetailLoader} from './dataloaders/comicDetail'
import {comicsLoader} from './dataloaders/comics'
import {COMICS_ORDER_ISSUE_NUMBER_DESC} from '../constants'
import {characterDetailLoader} from './dataloaders/characterDetail'
import {charactersLoader} from './dataloaders/characters'
import {creatorDetailLoader} from './dataloaders/creatorDetail'
import {creatorsLoader} from './dataloaders/creators'
import R from 'ramda'

export const resolvers = {
  Query: {
    creator(
      obj,
      {id}
    ) {
      return creatorDetailLoader.load(id)
    },

    creators(
      obj,
      {
        start,
        limit,
        orderBy,
        nameStartsWith = false
      }
    ) {
      const keys = {
        limit: limit || 12,
        offset: start || 0,
        orderBy
      }

      if (nameStartsWith) {
        keys.nameStartsWith = nameStartsWith
      }

      return creatorsLoader.load(JSON.stringify(keys))
    },

    comic(
      obj,
      {id}
    ) {
      return comicDetailLoader.load(id)
    },

    comics(
      obj,
      {
        start,
        limit,
        orderBy = COMICS_ORDER_ISSUE_NUMBER_DESC,
        titleStartsWith = false,
        characterIds = false
      }
    ) {
      const keys = {
        limit: limit || 12,
        offset: start || 0,
        orderBy
      }

      if (titleStartsWith) {
        keys.titleStartsWith = titleStartsWith
      }

      if (characterIds && R.length(characterIds)) {
        keys.characters = R.join(',', characterIds)
      }

      return comicsLoader.load(JSON.stringify(keys))
    },

    character(
      obj,
      {id}
    ) {
      return characterDetailLoader.load(id)
    },

    characters(
      obj,
      {
        start,
        limit,
        orderBy,
        nameStartsWith = false
      }
    ) {
      const keys = {
        limit: limit || 12,
        offset: start || 0,
        orderBy
      }

      if (nameStartsWith) {
        keys.nameStartsWith = nameStartsWith
      }

      return charactersLoader.load(JSON.stringify(keys))
    }
  }
}

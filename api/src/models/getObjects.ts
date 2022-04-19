/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { EntityTarget, FindConditions, FindOneOptions, getConnection, ILike } from 'typeorm'

function getContents (searchQuery) {
  const connection = getConnection()
  const contentRepository = connection.getRepository('Content')

  return contentRepository.find({
    relations: ['metadata', 'creatorPage'],
    where: [{
      metadata: {
        title: ILike(`%${searchQuery}%`)
      }
    },
    {
      creatorPage: {
        name: ILike(`%${searchQuery}%`)
      }
    }]
  })
}

function findEntity (
  criteria: FindConditions<unknown>,
  repository: EntityTarget<unknown>,
  options?: FindOneOptions
): Promise<any> {
  return getConnection().getRepository(repository).findOne(criteria, options)
}

export { getContents, findEntity }

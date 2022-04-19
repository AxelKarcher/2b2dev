/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { StatusCodes } from 'http-status-codes'
import { getManager } from 'typeorm'

import logger from '@middlewares/logging'

function deleteAccount (sess) {
  return getManager('main').delete('Account', { id: sess.account.id }).then(() => {
    delete sess.account
    return StatusCodes.NO_CONTENT
  }).catch((err) => {
    logger.error('Failed deleting account: ', err)
    throw new Error('Failed deleting account')
  })
}

export default deleteAccount

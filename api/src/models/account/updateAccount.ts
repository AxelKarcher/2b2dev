/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { StatusCodes } from 'http-status-codes'
import { getConnection } from 'typeorm'

import logger from '@middlewares/logging'

function updateAccount (sess, toUpdate) {
  const accountRepository = getConnection().getRepository('Account')

  if (toUpdate.bornDate) {
    const date = toUpdate.bornDate.split('/')
    toUpdate.bornDate = new Date(date[2], date[1] - 1, date[0])
  }
  return accountRepository.findOne({ id: sess.account.id }).then((account: any) => {
    sess.account = { ...sess.account, ...toUpdate }
    account = { ...account, ...toUpdate }
    return accountRepository.save(account)
  }).then((saved) => {
    return StatusCodes.NO_CONTENT
  }).catch((err) => {
    logger.error('Failed updating account: ', err)
    throw Error('Failed updating account')
  })
}

export default updateAccount

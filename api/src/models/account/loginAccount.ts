/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { getConnection } from 'typeorm'

function searchAccountByEmail (accountToLogIn) {
  return (
    getConnection()
      .getRepository('Account')
      .findOne({ email: accountToLogIn.email }, { relations: ['role'] })
  )
}

function createSession (sess, account) {
  const week = 3600000 * 24 * 7

  sess.cookie.expires = new Date(Date.now() + week)
  sess.cookie.maxAge = week
  sess.account = {
    id: account.id,
    email: account.email,
    role: { ...account.role },
    firstName: account.firstName,
    lastName: account.lastName,
    bornDate: account.bornDate,
    createdDate: account.createdDate
  }
}

function loginAccount (accountToLogIn, sess) {
  let account

  return searchAccountByEmail(accountToLogIn).then((foundAccount) => {
    if (!foundAccount) {
      return StatusCodes.FORBIDDEN
    }
    account = foundAccount
    return bcrypt.compare(
      accountToLogIn.password + account.salt, account.password
    ).then((isOk) => {
      if (isOk) {
        createSession(sess, account)
        return StatusCodes.OK
      } else {
        return StatusCodes.FORBIDDEN
      }
    })
  }).catch((err) => {
    throw new Error(err)
  })
}

export default loginAccount

/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { getConnection } from 'typeorm'

import logger from '@middlewares/logging'

function createNewAccountObject (accountToRegister, salt, password) {
  let bornDate = accountToRegister.bornDate || null

  if (bornDate) {
    const date = bornDate.split('/')
    bornDate = new Date(date[2], date[1] - 1, date[0])
  }

  return getConnection().getRepository('Role')
    .findOne({ name: accountToRegister.role }).then((role) => {
      if (!role) {
        logger.error(`Role "${accountToRegister.role}", does not exists`)
        return undefined
      }
      return ({
        salt,
        email: accountToRegister.email,
        password,
        firstName: accountToRegister.firstName,
        lastName: accountToRegister.lastName,
        bornDate,
        role
      })
    }).catch((err) => {
      logger.error('Failed getting role by name: ', err)
      throw new Error('Failed getting role by name')
    })
}

function registerAccountInDb (accountToRegister, accountRepository) {
  let passwordSalt

  return bcrypt.genSalt().then((salt) => {
    passwordSalt = salt
    return bcrypt.hash(accountToRegister.password + salt, 10)
  }).then((password) => {
    return createNewAccountObject(accountToRegister, passwordSalt, password)
  }).then((newAccount) => {
    if (!newAccount) { return undefined }
    return accountRepository.save(newAccount)
  }).then((savedAccount) => {
    if (!savedAccount) { return StatusCodes.BAD_REQUEST }
    logger.info(`Account has been created: ${JSON.stringify(savedAccount, null, 2)}`)
    return savedAccount
  }).catch((err) => {
    throw new Error(err)
  })
}

function registerAccount (accountToRegister) {
  const accountRepository = getConnection().getRepository('Account')

  return accountRepository.findOne({ email: accountToRegister.email }).then((foundAccount) => {
    return !!foundAccount
  }).then((alreadyRegistered) => {
    if (alreadyRegistered) {
      return StatusCodes.CONFLICT
    }
    return registerAccountInDb(accountToRegister, accountRepository)
  })
}

export default registerAccount

/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import bcrypt from 'bcrypt'
import { randomBytes } from 'crypto'
import { StatusCodes } from 'http-status-codes'
import { getConnection } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

function generateResetPasswordUrl (accountId, email = null) {
  const accountRepository = getConnection().getRepository('Account')
  let criteria: any = { id: accountId }

  if (email) { criteria = { email } }
  return accountRepository.findOne(criteria).then((account: any) => {
    account.passwordResetExpiration = getTomorrowDate()
    account.passwordResetToken = uuidv4()
    const pswd = randomBytes(8).readBigInt64LE()
    account.passwordResetPassword = pswd
    return accountRepository.save(account)
  }).then((saved) => {
    return `/reset-password?token=${saved.passwordResetToken}&password=${saved.passwordResetPassword.toString()}`
  }).catch((err) => { throw err })
}

function getTomorrowDate () {
  const current = new Date()
  const followingDay = new Date(current.getTime() + 86400000) // + 1 day in ms
  followingDay.toLocaleDateString()

  return followingDay
}

function accountIsAllowedToResetPassword (token, password) {
  const accountRepository = getConnection().getRepository('Account')

  return accountRepository.findOne({ passwordResetToken: token }).then((account: any) => {
    return (
      !account ||
      password !== account.passwordResetPassword ||
      Date.now() > account.passwordResetExpiration
        ? StatusCodes.FORBIDDEN
        : StatusCodes.OK
    )
  }).catch((err) => { throw err })
}

function changeAccountPassword (token, newPassword) {
  const accountRepository = getConnection().getRepository('Account')
  let saveAccount

  return accountRepository.findOne({ passwordResetToken: token }).then((account: any) => {
    saveAccount = account
    return bcrypt.compare(newPassword + account.salt, account.password)
  }).then((isSamePassword) => {
    if (isSamePassword) {
      throw Error('Same Password')
    }
    return bcrypt.genSalt()
  }).then((salt) => {
    saveAccount.salt = salt
    return bcrypt.hash(newPassword + salt, 10)
  }).then((password) => {
    saveAccount.password = password
    saveAccount.passwordResetToken = null
    saveAccount.passwordResetPassword = null
    return accountRepository.save(saveAccount)
  }).then((saved) => {
  }).catch((err) => { throw err })
}

export {
  generateResetPasswordUrl,
  accountIsAllowedToResetPassword,
  changeAccountPassword
}

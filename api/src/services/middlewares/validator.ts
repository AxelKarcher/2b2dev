/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

import logger from './logging'

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors: any[] = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  logger.info(`${req.session?.account?.email ?? '-'} | ${req.method} ${req.url}` +
    `\n    Bad Entity:${JSON.stringify(extractedErrors)}`)
  return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    errors: extractedErrors
  })
}

export default validate

/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { Router } from 'express'
import { body } from 'express-validator'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

import logger, { logApiRequest } from '@middlewares/logging'
import validate from '@middlewares/validator'

import loginAccount from '@models/account/loginAccount'

const router = Router()

const rules = [
  body('email').isEmail(),
  body('password').isString()
]

router.post('/account/login', rules, validate, logApiRequest, (req, res) => {
  return loginAccount(req.body, req.session).then((code) => {
    if (code === StatusCodes.OK) {
      logger.info(`Account successfully logged in: ${req.body.email}`)
    } else {
      logger.info(`Account's email or password is incorrect: ${req.body.email}`)
    }
    return res.status(code).send(getReasonPhrase(code))
  }).catch((err) => {
    logger.error(err.toString())
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR))
  })
})

export default router

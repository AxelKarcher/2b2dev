/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { Router } from 'express'
import { body, query } from 'express-validator'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

import logger, { logApiRequest } from '@middlewares/logging'
import validate from '@middlewares/validator'

import deleteAccount from '@models/account/deleteAccount'
import registerAccount from '@models/account/registerAccount'
import updateAccount from '@models/account/updateAccount'
import { findEntity } from '@models/getObjects'

const router = Router()

const rulesGet = [
  query('email').isString()
]

router.get('/account', rulesGet, validate, logApiRequest, (req, res) => {
  return findEntity({ email: req.query.email }, 'Account').then((account) => {
    if (!account) {
      return res.status(StatusCodes.NOT_FOUND).send(getReasonPhrase(StatusCodes.NOT_FOUND))
    }
    return res.status(StatusCodes.OK).json(account)
  }).catch((err) => {
    logger.error(err.toString())
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR))
  })
})

const rulesPost = [
  body('email').isEmail(),
  body('password').isString(),
  body('firstName').isString().optional(),
  body('lastName').isString().optional(),
  body('bornDate').isDate({ format: 'DD/MM/YYYY' }).optional({ nullable: true, checkFalsy: true }),
  body('role').default('user').if(body('role').exists).isString()
]

router.post('/account', rulesPost, validate, logApiRequest, (req, res) => {
  return registerAccount(req.body).then((result) => {
    if (typeof result === 'object') {
      return res.status(StatusCodes.CREATED).json(result)
    }
    return res.status(result).send(getReasonPhrase(result))
  }).catch((err) => {
    logger.error(err.toString())
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR))
  })
})

const rulesPatch = [
  body('email').isEmail().optional(),
  body('password').isString().optional(),
  body('firstName').isString().optional(),
  body('lastName').isString().optional(),
  body('bornDate').isDate({ format: 'DD/MM/YYYY' }).optional(),
  body('role').isString().optional()
]

router.patch('/account', rulesPatch, validate, logApiRequest, (req, res) => {
  if (!req.session.account) {
    return res.status(StatusCodes.BAD_REQUEST)
      .send(getReasonPhrase(StatusCodes.BAD_REQUEST))
  }
  return updateAccount(req.session, req.body).then((code) => {
    return res.status(code).send(getReasonPhrase(code))
  }).catch((err) => {
    logger.error(err.toString())
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR))
  })
})

const rulesDelete = [
]

router.delete('/account', rulesDelete, validate, logApiRequest, (req, res) => {
  if (!req.session.account) {
    return res.status(StatusCodes.BAD_REQUEST)
      .send(getReasonPhrase(StatusCodes.BAD_REQUEST))
  }
  return deleteAccount(req.session).then((code) => {
    return res.status(code).send(getReasonPhrase(code))
  }).catch((err) => {
    logger.error(err.toString())
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR))
  })
})

export default router

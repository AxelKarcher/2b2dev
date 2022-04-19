/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { Router } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

import logger, { logApiRequest } from '@middlewares/logging'
import validate from '@middlewares/validator'

const router = Router()

const rules = [
]

router.post('/account/logout', rules, validate, logApiRequest, (req, res) => {
  return req.session.destroy((err) => {
    if (err) {
      logger.error(err.toString())
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR))
    }
    return res.status(StatusCodes.NO_CONTENT).send(getReasonPhrase(StatusCodes.NO_CONTENT))
  })
})

export default router

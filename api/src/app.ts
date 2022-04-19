/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import express from 'express'
import { createConnection } from 'typeorm'

import logger from '@middlewares/logging'

import useMiddlewares from '@services/utils/useMiddlewares'
import useRoutes from '@services/utils/useRoutes'
import useSession from '@services/utils/useSession'

function connectToDatabase () {
  return createConnection().then(connexion => {
    return connexion.synchronize().then(() => {
      logger.info('Successfully connected to the db !')
    })
  })
}

(() => {
  const app = express()
  const port = process.env.PORT

  // useSession(app)
  useMiddlewares(app)
  useRoutes(app)

  app.listen(port, () => {
    logger.info(`App listening at http://localhost:${port}`)
    // connectToDatabase().then(() => {
    //   logger.info(`App listening at http://localhost:${port}`)
    // }).catch((err) => logger.error(err.toString()))
  })
})()

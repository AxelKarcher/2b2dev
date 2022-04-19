/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import connectRedis from 'connect-redis'
import session, { SessionOptions } from 'express-session'
import { createClient } from 'redis'

import { Account } from '@entities/Account'

declare module 'express-session' {
  export interface SessionData {
    account: Account;
  }
}

function useSession (app) {
  const RedisStore = connectRedis(session)
  const client = createClient({ url: 'redis://default@0.0.0.0:6379' })
  const sess: SessionOptions = {
    store: new RedisStore({ client }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000 * 24 * 7,
      sameSite: app.get('env') === 'production' ? 'none' : 'strict'
    }
  }
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sess.cookie!.secure = true
  }

  app.use(session(sess))
}

export default useSession

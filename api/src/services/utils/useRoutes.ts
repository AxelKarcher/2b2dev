/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import account from '../../routes/account/account'
import accountLogin from '../../routes/account/login/login'
import accountLogout from '../../routes/account/logout/logout'
import basicEndpoints from '../../routes/basicEndpoints'

const useRoutes = (app) => (
  app
    .use(accountLogin)
    .use(accountLogout)
    .use(account)

    .use(basicEndpoints)
)

export default useRoutes

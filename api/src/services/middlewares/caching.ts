/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

function caching (duration) {
  return (req, res, next) => {
    if (process.env.NODE_ENV !== 'development') {
      if (req.method === 'GET') {
        res.set('Cache-control', `public, max-age=${duration}`)
      } else {
        res.set('Cache-control', 'no-store')
      }
    }
    next()
  }
}

export default caching

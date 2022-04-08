/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import RinkuBoard from './worlds/RinkuBoard/RinkuBoard'
import World from './worlds/World/World'

const wordList = [
  {
    path: '/',
    component: <World />
  },
  {
    path: '/RinkuBoard',
    component: <RinkuBoard />
  }
]

export default wordList

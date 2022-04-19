/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import Navy from './worlds/Navy/Navy'
import World from './worlds/World/World'

const wordList = [
  {
    path: '/',
    component: <World />
  },
  {
    path: '/Navy',
    component: <Navy />
  }
]

export default wordList

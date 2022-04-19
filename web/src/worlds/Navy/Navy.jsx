/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { useState, useEffect } from 'react'
import './Navy.scss'

function Navy () {
  const socket = new WebSocket('ws://86.252.64.16:8080')
  const boardBase = Array(49).fill(false)

  const [myBoard, setMyBoard] = useState([...boardBase])
  const [enemyBoard, setEnemyBoard] = useState([...boardBase])
  const [messages, setMessages] = useState(Array(20))

  socket.addEventListener('open', (event) => {
    socket.send('Coucou le serveur !')
  })

  socket.addEventListener('message', (event) => {
    console.log('Voici un message du serveur r', event.data)
  })

  const handleClick = (which, index) => {
    const newBoard = which === 'my' ? [...myBoard] : [...enemyBoard]

    newBoard[index] = !newBoard[index]
    which === 'my' && (setMyBoard(newBoard))
    which === 'enemy' && (setEnemyBoard(newBoard))
  }

  return (
    <div id={'navyContainer'}>
      <div className={'board'} id={'myBoard'}>
        {
          myBoard.map((elem, i) => (
            <div
              key={ i }
              className={'boardTile'}
              style={{ backgroundColor: elem ? 'black' : 'white' }}
              onClick={() => (handleClick('my', i))}
            />
          ))
        }
      </div>
      <div className={'board'} id={'enemyBoard'}>
        {
          enemyBoard.map((elem, i) => (
            <div
              key={ i }
              className={'boardTile'}
              style={{ backgroundColor: elem ? 'black' : 'white' }}
              onClick={() => (handleClick('enemy', i))}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Navy

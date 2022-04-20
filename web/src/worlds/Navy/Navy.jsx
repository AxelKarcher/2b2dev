/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { useState, useEffect, useRef } from 'react'

import TextField from '@mui/material/TextField'

import './Navy.scss'
import config from '../../config.json'

const boardBase = Array(49).fill(false)

function Navy () {
  const ws = useRef(null)

  const [myBoard, setMyBoard] = useState([...boardBase])
  const [enemyBoard, setEnemyBoard] = useState([...boardBase])
  const [fieldContent, setFieldContent] = useState('')
  const [messages, setMessages] = useState([])
  const [isOnce, setIsOnce] = useState(false)

  useEffect(() => {
    ws.current = new WebSocket('ws://152.228.172.7:8080') // 86.252.64.16 // 152.228.172.7

    return () => { ws.current.close() }
  }, [])

  useEffect(() => {
    if (!ws.current) { return }

    ws.current.onmessage = (data) => {
      if (isOnce) {
        const newMessages = [...messages]

        newMessages.push(JSON.parse(data.data))
        setMessages(newMessages)
      } else {
        setMessages(JSON.parse(data.data))
        setIsOnce(true)
      }
    }
  }, [isOnce, messages])

  const handleClick = (which, index) => {
    const newBoard = which === 'my' ? [...myBoard] : [...enemyBoard]

    newBoard[index] = !newBoard[index]
    which === 'my' && (setMyBoard(newBoard))
    which === 'enemy' && (setEnemyBoard(newBoard))
  }

  const sendMessage = () => {
    ws.current.send(JSON.stringify(fieldContent))
    setFieldContent('')
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
      <div id={'chat'}>
        {
          messages.map((elem, i) => (
            <div key={ i } className={'message'}>
              {elem}
            </div>
          ))
        }
        <TextField
          autoComplete={'off'}
          variant={'standard'}
          value={fieldContent}
          onChange={(e) => setFieldContent(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          sx={{
            input: { color: config.chatColor },
            '& .MuiInput-underline:after': {
              borderBottomColor: config.chatColor
            }
          }}
        />
      </div>
    </div>
  )
}

export default Navy

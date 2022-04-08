/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

// import { useNavigate } from 'react-router-dom'
import TwitchTracker from './components/TwitchTracker/TwitchTracker'

import './RinkuBoard.scss'

function RinkuBoard () {
  // const navigate = useNavigate()

  return (
    <div id={'rinkuBoardContainer'}>
      <div className={'panel'}>
        <TwitchTracker channelName={'ponce'} />
      </div>
    </div>
  )
}

export default RinkuBoard

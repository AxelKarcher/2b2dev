/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import './TwitchTracker.scss'

function TwitchTracker ({ channelName }) {
  return (
    <div id={'twitchTrackerContainer'}>
      {channelName}
    </div>
  )
}

export default TwitchTracker

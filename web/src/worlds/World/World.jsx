/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { Box } from '@mui/material'

import BonsoirAudience from './BonsoirAudience/BonsoirAudience'
import SecretDick from './SecretDick/SecretDick'

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

function World () {
  const secretDickCoordinates = [randomIntFromInterval(0, 1800), randomIntFromInterval(0, 2000)]

  return (
    <Box sx={{
      height: `${Math.max(1200, secretDickCoordinates[1] + 100)}px`,
      width: '100%',
      position: 'absolute',
      backgroundColor: '#252a30'
    }}>
      <SecretDick coordinates={secretDickCoordinates}/>
      <BonsoirAudience />
    </Box>
  )
}

export default World

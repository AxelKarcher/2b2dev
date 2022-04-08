/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { Box } from '@mui/material'

import congrats from '../../../assets/congrats.gif'
import henri from '../../../assets/henri.jpg'

function BonsoirAudience () {
  return (
    <Box>
      <Box component={'p'} sx={{
        textAlign: 'center',
        color: 'white',
        fontSize: 'h3.fontSize'
      }}>
        Bonsoir
      </Box>
      <a href={'https://www.linkedin.com/in/henriroumegoux/'} target={'_blank'} rel={'noreferrer'}>
        <Box component={'img'} src={henri} sx={{
          width: '300px',
          position: 'absolute',
          left: '50px',
          top: '50px',
          borderRadius: 100,
          '&:hover': {
            borderRadius: 15
          }
        }}/>
      </a>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
        <Box component={'img'} src={congrats}/>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '1280px', height: '720px' }}
          component={'iframe'}
          src={'https://www.youtube.com/embed/WMdFnFjyR48?controls=0&autoplay=0&start=7'}
          title={'YouTube video player'} frameBorder={'0'}
          allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
          allowFullScreen
        />
      </Box>
    </Box>
  )
}

export default BonsoirAudience

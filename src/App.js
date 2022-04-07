/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { Box, Container } from '@mui/material'

function App () {
  return (
    <Box sx={{
      height: '120vh',
      width: '100%',
      position: 'absolute',
      backgroundColor: '#252a30'
    }}>
      <Box component={'p'} sx={{
        textAlign: 'center',
        color: 'white',
        fontSize: 'h3.fontSize'
      }}>
        Bonsoir Audience
      </Box>
      <Container component={'iframe'}
        width={'1280'} height={'720'}
        src={'https://www.youtube.com/embed/WMdFnFjyR48?controls=0&autoplay=1&start=7'}
        title={'YouTube video player'} frameBorder={'0'}
        allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
        allowFullScreen
      />
    </Box>
  )
}

export default App

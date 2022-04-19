/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import PropTypes from 'prop-types'

import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'

import bite from '../../../assets/old_penis.png'

function SecretDick ({ coordinates }) {
  const navigate = useNavigate()

  return (
    <Box sx={{ position: 'absolute', right: `${coordinates[0]}px`, top: `${coordinates[1]}px` }}>
      <Box onClick={() => navigate('/Navy')} component={'img'} src={bite} sx={{ width: '20px' }}/>
    </Box>
  )
}
SecretDick.propTypes = {
  coordinates: PropTypes.array.isRequired
}

export default SecretDick

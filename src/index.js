/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { createRoot } from 'react-dom/client'

import App from './App'

import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App/>)

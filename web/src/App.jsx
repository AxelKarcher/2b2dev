/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import wordList from './wordList'

const NotFoundPage = <div><h1>404 - Not Found</h1></div>

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'*'} element={NotFoundPage}/>
        {wordList.map(({ path, component }, index) => {
          return (
            <Route key={index} exact path={path} element={component}/>
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}
export default App

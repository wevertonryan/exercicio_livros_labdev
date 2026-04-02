import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import ListBooks from './pages/ListBooks.jsx'
import RegisterBook from './pages/RegisterBook.jsx'

function App() {
  return (
    <>
      <header>
        <h1>

        </h1>
        <nav>
          <li><a href="/">Home</a></li>
          <li><a href="/new">Cadastrar Livro</a></li>
        </nav>
      </header>
      <main>
      <Routes>
          <Route path='/' element={<ListBooks />} />
          <Route path='/new' element={<RegisterBook />} />
      </Routes>
      </main>
      <footer>

      </footer>
    </>
  )
}

export default App

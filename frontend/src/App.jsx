import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import HomeBooks from './pages/HomeBooks.jsx'
import SearchBooks from './pages/SearchBooksByAutor.jsx'
import RegisterBook from './pages/RegisterBook.jsx'

function App() {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <h1>
          Biblioteca
        </h1>
        <nav>
          <li onClick={()=>{navigate("/")}}>Home</li>
          <li onClick={()=>{navigate("/new")}}>Cadastrar Livro</li>
        </nav>
      </header>
      <main>
      <Routes>
          <Route path='/' element={<HomeBooks />} />
          <Route path='/new' element={<RegisterBook />} />
          <Route path='/search' element={<SearchBooks />} />
      </Routes>
      </main>
      <footer>

      </footer>
    </>
  )
}

export default App

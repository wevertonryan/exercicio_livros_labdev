import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import ListBooks from './pages/ListBooks.jsx'
import RegisterBook from './pages/RegisterBook.jsx'
import BookListCard from './components/bookListCard.jsx'

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

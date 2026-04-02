import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBooks } from '../api/api.jsx';
import BookListCard from '../components/bookListCard.jsx';

export default function ListBooks(){
    const [allBooksJson, setAllBooksJson] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        async function gettingAllBooks(){
            const axiosResponse = await getAllBooks();
            setAllBooksJson(await axiosResponse.data.result)
        }
        gettingAllBooks()
    })

    const allBooksJSX = allBooksJson.map((book) => {
        console.log(book)
        return <BookListCard />
    })

    const handleAddOnStock = ()=>{
    }

    return(
        <>
            <h1>Livros</h1>
            <div className='gap-2'>
                <button onClick={() => navigate("/new")}>Cadastrar Livro</button>
                <button onClick={handleAddOnStock}>Adicionar Livro ao Estoque</button>
            </div>
            
            <div className='w-full p-4'>
                { allBooksJSX }
            </div>
        </>
    )
}
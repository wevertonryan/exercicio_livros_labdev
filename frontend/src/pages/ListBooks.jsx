import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBooks } from '../api/api.jsx';

export default function ListBooks(){
    const [allBooksJson, setAllBooksJson] = useState([]);

    useEffect(()=>{
        async function gettingAllBooks(){
            const axiosResponse = await getAllBooks();
            setAllBooksJson(await axiosResponse.data.result)
        }
        gettingAllBooks()
    })

    const allBooksJSX = allBooksJson.map((book) => 
    <div data-id={book._id}>
        <h2>Titulo: {book.titulo}</h2>
        <p>Autor: {book.autor}</p>
        <p>Ano: {book.dataLimite}</p>
    </div>)

    return(
        <>
            <h1>Livros</h1>
            <a href='/new'>Cadastrar Livro</a>
            { allBooksJSX }
        </>
    )
}
import { useEffect, useState } from 'react';
import { getBooksByAutor } from '../api/api.jsx';
import BookListCard from '../components/bookListCard.jsx';
import { toast } from 'react-toastify';

export default function SearchBooks(){
    const urlParams = new URLSearchParams(window.location.search);
    const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    useEffect(()=>{
        const searchingData = new Promise((resolve, reject)=>{
            getBooksByAutor(urlParams.get("autor"))
            .then(result => {
                setIsLoading(false);
                setData(result.data.result);
                resolve(result.data.result);
            })
            .catch(error => {
                setIsError(true);
                setError(error.message);
                reject(error);
            })
        })
        toast.promise(searchingData, {
            pending: 'Pesquisando livros',
            error: 'Falha na pesquisa!'
        })
    }, [])

    if (isLoading) return 'Procurando Livros...';
    if (isError) return error ;
    
    const allBooksJSX = data.length > 0 ? data.map((book) => {
        return <BookListCard book={book}/>
    }) : <p>Nem um livro encontrado</p>

    //console.log(document.cookie)

    return(
        <>
            <div className='w-full flex gap-2 pb-8'>
                <input className="leading-[inherit] h-auto grow" type="text" id="search" placeholder='Procurar Livros por Autor'/>
                <button onClick={()=> {window.location.href = "/search?autor=" + document.getElementById("search").value; }}>Procurar</button>
            </div>
            <h1>Resultado da Pesquisa</h1>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 w-full py-4 gap-2 '>
                { allBooksJSX }
            </div>
        </>
    )
}
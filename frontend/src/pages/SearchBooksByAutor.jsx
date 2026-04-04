import { useEffect } from 'react';
import { getBooksByAutor } from '../api/api.jsx';
import BookListCard from '../components/bookListCard.jsx';
import { useQuery } from '@tanstack/react-query';

export default function SearchBooks(){
    const urlParams = new URLSearchParams(window.location.search);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [window.location.search],
        queryFn: async ()=> {
            const result = await getBooksByAutor(urlParams.get("autor"));
            return result.data.result; // O que você retornar aqui vira o "data"
        },
        staleTime: 1000 * 60 * 5, // Considera o dado "fresco" por 5 minutos (não refaz fetch à toa)
        retry: 3,                 // Se falhar, tenta 3 vezes antes de desistir
        refetchOnWindowFocus: false // Para de atualizar toda vez que você clica na aba do Chrome
    })

    if (isLoading) return 'Carregando...';
    if (isError) return error ;
    
    const allBooksJSX = data.map((book) => {
        return <BookListCard book={book}/>
    })

    //console.log(document.cookie)

    return(
        <>
            <div>
                <input type="text" id="search" placeholder='Procurar Livros por Autor'/>
                <button>Procurar</button>
            </div>
            <h1>Resultado da Pesquisa</h1>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 w-full py-4 gap-2 '>
                { allBooksJSX }
            </div>
        </>
    )
}
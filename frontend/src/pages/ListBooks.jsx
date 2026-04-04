import { useNavigate } from 'react-router-dom';
import { getAllBooks } from '../api/api.jsx';
import BookListCard from '../components/bookListCard.jsx';
import { useQuery } from '@tanstack/react-query';
import CookieQuery from '../api/cookieQuerys.js';

export default function ListBooks(){
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['allBooksJson'],
        queryFn: async ()=> {
            const result = await getAllBooks();
            return result.data.result; // O que você retornar aqui vira o "data"
        },
        staleTime: 1000 * 60 * 5, // Considera o dado "fresco" por 5 minutos (não refaz fetch à toa)
        retry: 3,                 // Se falhar, tenta 3 vezes antes de desistir
        refetchOnWindowFocus: false // Para de atualizar toda vez que você clica na aba do Chrome
    })

    if(CookieQuery.getCookie("newBook") == "true"){
        console.log("Tem Livro novo");
        refetch();
        CookieQuery.upsertCookie("newBook", "false");
    } 
    

    const navigate = useNavigate();

    const handleAddOnStock = ()=>{
    }

    if (isLoading) return 'Carregando...';
    if (isError) return error ;
    
    const allBooksJSX = data.map((book) => {
        return <BookListCard book={book}/>
    })

    //console.log(document.cookie)

    return(
        <>
            <div className='w-full flex gap-2 pb-8'>
                <input className="leading-[inherit] grow" type="text" id="search" placeholder='Procurar Livros por Autor'/>
                <button>Procurar</button>
            </div>
            <div className='flex flex-wrap justify-between gap-4'>
                <h1>Livros</h1>
                <div className='flex gap-2 flex-wrap justify-end'>
                    <button onClick={() => navigate("/new")}>Cadastrar Livro</button>
                    <button onClick={handleAddOnStock}>Adicionar Livro ao Estoque</button>
                </div>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 w-full py-4 gap-2 '>
                { allBooksJSX }
            </div>
        </>
    )
}
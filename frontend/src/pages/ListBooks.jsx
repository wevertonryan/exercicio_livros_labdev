import { useNavigate } from 'react-router-dom';
import { getAllBooks } from '../api/api.jsx';
import BookListCard from '../components/bookListCard.jsx';
import { useQuery } from '@tanstack/react-query';

export default function ListBooks(){
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['allBooksJson'],
        queryFn: async ()=> {
            const result = await getAllBooks();
            return result.data.result; // O que você retornar aqui vira o "data"
        },
        staleTime: 1000 * 60 * 5, // Considera o dado "fresco" por 5 minutos (não refaz fetch à toa)
        retry: 3,                 // Se falhar, tenta 3 vezes antes de desistir
        refetchOnWindowFocus: false // Para de atualizar toda vez que você clica na aba do Chrome
    })

    const navigate = useNavigate();

    const handleAddOnStock = ()=>{
    }

    if (isLoading) return 'Carregando...';
    if (isError) return error ;
    
    const allBooksJSX = data.map((book) => {
        return <BookListCard book={book}/>
    })

    
    
    return(
        <>
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
import { getAllBooks } from '../api/api.jsx';
import { useQuery } from '@tanstack/react-query';
import CookieQuery from '../api/cookieQuerys.js';
import ListBooks from './ListBooks.jsx';

export default function HomeBooks(){
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

    if (isLoading) return 'Carregando...';
    if (isError) return error ;

    return <ListBooks data={data} refetch={refetch}/>;
}
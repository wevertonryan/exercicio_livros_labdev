import { getAllBooks } from '../api/api.jsx';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import CookieQuery from '../api/cookieQuerys.js';
import ListBooks from './ListBooks.jsx';

export default function HomeBooks(){
    const [newBooks, setNewBooks] = useState("0");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const urlParams = new URLSearchParams(window.location.search);
    const urlPage = urlParams.get("page") || 1;

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['allBooksJson', urlPage, newBooks],
        queryFn: async ()=> {
            const result = await getAllBooks(urlPage);
            setPage(result.data.page);
            setTotalPages(result.data.totalPages);
            return result.data.result; // O que você retornar aqui vira o "data"
        },
        staleTime: 1000 * 60 * 5, // Considera o dado "fresco" por 5 minutos (não refaz fetch à toa)
        retry: 3,                 // Se falhar, tenta 3 vezes antes de desistir
        refetchOnWindowFocus: false // Para de atualizar toda vez que você clica na aba do Chrome
    })

    const newBook = CookieQuery.getCookie("newBook");
    if(newBook != newBooks){
        refetch();
        setNewBooks(newBook)
    } 

    if (isLoading) return 'Carregando...';
    if (isError) return error ;

    return <ListBooks data={data} page={page} totalPages={totalPages} refetch={refetch}/>;
}
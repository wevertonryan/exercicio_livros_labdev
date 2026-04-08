import { useEffect, useState } from 'react';
import { getBooksByAutor } from '../api/api.jsx';
import BookListCard from '../components/bookListCard.jsx';
import { toast } from 'react-toastify';
import ListBooks from './ListBooks.jsx';

export default function SearchBooks(){
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const urlParams = new URLSearchParams(window.location.search);
    const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    const urlAutor = urlParams.get("autor");
    const urlPage = urlParams.get("page") || 1;

    useEffect(()=>{
        const searchingData = new Promise((resolve, reject)=>{
            getBooksByAutor(urlAutor, urlPage)
            .then(result => {
                setIsLoading(false);

                setPage(result.data.page);
                setTotalPages(result.data.totalPages);
                
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
    
    return <ListBooks data={data} page={page} totalPages={totalPages} refetch={()=>{}}/>
}
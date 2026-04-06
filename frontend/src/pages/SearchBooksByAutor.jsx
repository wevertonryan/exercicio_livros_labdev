import { useEffect, useState } from 'react';
import { getBooksByAutor } from '../api/api.jsx';
import BookListCard from '../components/bookListCard.jsx';
import { toast } from 'react-toastify';
import ListBooks from './ListBooks.jsx';

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
    
    return <ListBooks data={data} refetch={()=>{}}/>
}
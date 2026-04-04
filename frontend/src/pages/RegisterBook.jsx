import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../api/api.jsx';
import CookieQuery from '../api/cookieQuerys.js';
import { toast } from 'react-toastify';

export default function RegisterBook(){
    const [titulo, setTitulo] = useState(undefined);
    const [autor, setAutor] = useState(undefined);
    const [isbn, setIsbn] = useState(undefined);
    const [anoPublicacao, setAnoPublicacao] = useState(undefined);
    const [quantidadeEstoque, setQuantidadeEstoque] = useState(undefined);

    const navigate = useNavigate();
    //const navigate:NavigateFunction = useNavigate();


    const savingBook = (book) => new Promise((resolve, reject)=>{
        createBook(book)
        .then(()=>{
            CookieQuery.upsertCookie("newBook", "true");
            navigate(-1);
            resolve();
        })
        .catch(() => reject())
    });

    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        console.log(titulo)
        if(!titulo && !autor && !isbn){
            toast.error("Titulo, Autor e ISBN são itens obrigatórios!");
            return;
        }

        const obj = {
            titulo: titulo, 
            autor: autor, 
            isbn: isbn, 
            ano_publicacao: anoPublicacao,
            quantidade_estoque: quantidadeEstoque
        }

        const json = JSON.stringify(obj)
        await toast.promise(savingBook(json),{
            pending: 'Cadastrando Livro',
            success: 'Livro Cadastrado com Sucesso!',
            error: 'Falha ao Cadastrar Livro!'
        })
        return;
    }

    return (
        <form className="flex flex-col gap-6 sm:px-10">
        <h1 className="text-center sm:text-start">Cadastrar Livro</h1>
        <div className='grid grid-cols-6 w-full gap-3'>
            <div className="register-input col-span-6 sm:col-span-3">
                <label htmlFor="titulo" >Titulo</label> 
                <input type="text" name="titulo" id="titulo" onChange={e => setTitulo(e.target.value)}/>
            </div>

            <div className="register-input col-span-6 sm:col-span-3">
                <label htmlFor="autor" >Autor</label> 
                <input type="text" name="autor" id="autor" onChange={e => setAutor(e.target.value)}/>
            </div>

            <div className="register-input col-span-6 sm:col-span-2">
                <label htmlFor="isbn" >ISBN</label> 
                <input type="text" name="isbn" id="isbn" onChange={e => setIsbn(e.target.value)}/>
            </div>

            <div className="register-input col-span-3 sm:col-span-2">
                <label htmlFor="anoPublicacao">Ano de Publicacao</label> 
                <input type="text" name="anoPublicacao" id="anoPublicacao" onChange={e => setAnoPublicacao(e.target.value)}/>
            </div>

            <div className="register-input col-span-3 sm:col-span-2">
                <label htmlFor="quantidadeEstoque" >Quantidade de Estoque</label> 
                <input type="text" name="quantidadeEstoque" id="quantidadeEstoque" onChange={e => setQuantidadeEstoque(e.target.value)}/>
            </div>
        </div>
        <button className="sm:self-end" type="submit" onClick={handleSubmit}>Cadastrar Livro</button>
        </form>
    )
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../api/api.jsx';

export default function RegisterBook(){
    const [titulo, setTitulo] = useState(null);
    const [autor, setAutor] = useState(null);
    const [isbn, setIsbn] = useState(null);
    const [anoPublicacao, setAnoPublicacao] = useState(null);
    const [quantidadeEstoque, setQuantidadeEstoque] = useState(null);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    //const navigate:NavigateFunction = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        if(!titulo && !autor && !isbn){
            alert("Titulo, Autor e ISBN são itens obrigatórios!");
            return;
        }

        const obj = {
            titulo: titulo, 
            autor: autor, 
            isbn: isbn, 
            anoPublicacao: anoPublicacao,
            quantidadeEstoque: quantidadeEstoque
        }

        const json = JSON.stringify(obj)
        setSaving(true);
        try {
            await createBook(json);
            navigate(-1);
        } catch (error) {
            console.log(error)
        }
        setSaving(false)
        return
    }
    return (
        <form>
            <p>{saving ? "Salvando" : ""}</p>

            <h1>Cadastrar Livro</h1>

            <label htmlFor="titulo">Titulo</label>
            <input type="text" name="titulo" id="titulo" onChange={e => setTitulo(e.target.value)}/><br />

            <label htmlFor="autor">Autor</label>
            <input type="text" name="autor" id="autor" onChange={e => setAutor(e.target.value)} /><br />

            <label htmlFor="isbn">ISBN</label>
            <input type="text" name="isbn" id="isbn" onChange={e => setIsbn(e.target.value)} /><br />

            <label htmlFor="anoPublicacao">Ano de Publicação</label>
            <input type="number" name="anoPublicacao" id="anoPublicacao" onChange={e => setAnoPublicacao(e.target.value)} /><br />

            <label htmlFor="quantidadeEstoque">Quantidade de Estoque</label>
            <input type="number" name="quantidadeEstoque" id="quantidadeEstoque" onChange={e => setQuantidadeEstoque(e.target.value)} /><br />

            <button type="submit" onClick={handleSubmit}>Cadastrar Livro</button>
        </form>
    )
}
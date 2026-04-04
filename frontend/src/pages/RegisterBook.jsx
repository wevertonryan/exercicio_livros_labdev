import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../api/api.jsx';

function RegisterBookInput({name, normalizedName, inputType, colSpan=3, handleFunc, onFather="", onLabel="", onInput=""}){
    
    const style = "flex flex-col col-span-" + colSpan
    return (
        <div {...onFather} className={style}>
            <label {...onLabel} htmlFor={normalizedName} >{name}</label> 
            <input {...onInput} type={inputType} name={normalizedName} id={normalizedName} onChange={e => handleFunc(e.target.value)}/>
        </div>
    );
}

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
            ano_publicacao: anoPublicacao,
            quantidade_estoque: quantidadeEstoque
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
        <form className="flex flex-col gap-4">
        <div>
            <h1>Cadastrar Livro</h1><p>{saving ? "Salvando" : ""}</p>
        </div>
        <div className='grid grid-cols-3 sm:grid-cols-6 w-full gap-4'>
            

            <RegisterBookInput 
                name="Titulo" 
                normalizedName="titulo" 
                inputType="text" 
                handleFunc={setTitulo}
            />

            <RegisterBookInput 
                name="Autor" 
                normalizedName="autor" 
                inputType="text" 
                handleFunc={setAutor} 
            />

            <RegisterBookInput 
                name="ISBN" 
                normalizedName="isbn" 
                inputType="text" 
                handleFunc={setIsbn} 
                colSpan="2"
            />

            <RegisterBookInput 
                name="Ano de Publicação" 
                normalizedName="anoPublicacao" 
                inputType="number" 
                handleFunc={setAnoPublicacao} 
                colSpan="2"
            />

            <RegisterBookInput 
                name="Quantidade de Estoque" 
                normalizedName="quantidadeEstoque" 
                inputType="number" 
                handleFunc={setQuantidadeEstoque} 
                colSpan="2"
            />

        </div>
        <button className="col-span-3 self-end" type="submit" onClick={handleSubmit}>Cadastrar Livro</button>
        </form>
    )
}
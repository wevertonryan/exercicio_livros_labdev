import { useNavigate } from 'react-router-dom';
import BookListCard from '../components/bookListCard.jsx';
import { useState } from 'react';
import PopUpAddBookOnStock from './AddBookOnStock.jsx';

export default function ListBooks({data, refetch}){
    const [isPopUpAddOnStockVisible, setIsPopUpAddOnStockVisible] = useState(false);
    const [addOnStockBookId, setAddOnStockBookId] = useState(undefined);
    const [addOnStockBookTitulo, setAddOnStockBookTitulo] = useState(undefined);

    const navigate = useNavigate();
    
    const handleAddOnStock = (id, titulo) => {
        setAddOnStockBookId(id);
        setAddOnStockBookTitulo(titulo);
        setIsPopUpAddOnStockVisible(true);
    }
    
    const allBooksJSX = data.map((book) => {
        return <BookListCard book={book} handleAddOnStock={handleAddOnStock}/>
    })

    return(
        <>
            <div className='w-full flex gap-2 pb-8'>
                <input className="leading-[inherit] h-auto grow" type="text" id="search" placeholder='Procurar Livros por Autor'/>
                <button onClick={()=> {window.location.href = "/search?autor=" + document.getElementById("search").value; }}>Procurar</button>
            </div>
            <div className='flex flex-wrap justify-between gap-4'>
                <h1>Livros</h1>
                <button onClick={() => navigate("/new")}>Cadastrar Livro</button>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 w-full py-4 gap-2 '>
                { allBooksJSX }
            </div>
            {isPopUpAddOnStockVisible ? 
                <PopUpAddBookOnStock 
                    id={addOnStockBookId} 
                    titulo={addOnStockBookTitulo}  
                    setIsPopUpAddOnStockVisible={setIsPopUpAddOnStockVisible}
                    refetch={refetch}
                /> : ""}
        </>
    )
}
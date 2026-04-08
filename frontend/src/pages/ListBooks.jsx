import { useNavigate } from 'react-router-dom';
import BookListCard from '../components/bookListCard.jsx';
import { useState } from 'react';
import PopUpAddBookOnStock from './AddBookOnStock.jsx';

/*
se não tiver paginas, manda nada
cresce com base em pages
mas não passa de 10 pages
se tiver próxima do final é para ficar selecionado a que está próxima do final
se estiver no começo é para ficar próximo do começo
mas se tiver muita página fica no meio
é para direcionar via link url
*/
function Pagination({page, totalPages}){
    const navigate = useNavigate();

    if(totalPages == 1) return <></>;

    const urlParams = new URLSearchParams(window.location.search);
    const actualPage = window.location.pathname;

    const pagesJSX = []
    for(let i = 1; i <= totalPages; i++){
        urlParams.set("page", i)
        const paramsString = urlParams.toString()
        pagesJSX.push(<button onClick={() => navigate(`${actualPage}?${paramsString}`)} >{i}</button>)
    }
    return(
        <div className='w-full flex justify-center gap-1'>
            { pagesJSX }
        </div>
    )
}

export default function ListBooks({data, page = 1, totalPages = 1, refetch}){
    
    const [isPopUpAddOnStockVisible, setIsPopUpAddOnStockVisible] = useState(false);
    const [addOnStockBookId, setAddOnStockBookId] = useState(undefined);
    const [addOnStockBookTitulo, setAddOnStockBookTitulo] = useState(undefined);

    const navigate = useNavigate();
    
    const handleAddOnStock = (id, titulo) => {
        setAddOnStockBookId(id);
        setAddOnStockBookTitulo(titulo);
        setIsPopUpAddOnStockVisible(true);
    }

    let allBooksJSX = <p>Nem um livro encontrado!</p>;
    if(data.length > 0){
        allBooksJSX = data.map((book) => {
            return <BookListCard book={book} handleAddOnStock={handleAddOnStock}/>
        });
    }
    
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
            <Pagination page={page} totalPages={totalPages} />
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
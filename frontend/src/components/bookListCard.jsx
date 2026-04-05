export default function BookListCard({book, handleAddOnStock}){

    return(
    <div id={book._id} className="w-full bg-orange-200 p-2 rounded">
        <div className="flex justify-between">
            <h2>{book.titulo}</h2><button className="px-2 pt-0 pb-1 " onClick={()=>{handleAddOnStock(book._id, book.titulo)}}>+</button>
        </div>
        <div className="flex flex-col justify-between pl-2">
            <p className="little-text">Autor: {book.autor}</p>
            <p className="little-text">Ano: {book.ano_publicacao}</p>
            <p className="little-text">Estoque: {book.quantidade_estoque}</p>
        </div>
    </div>)
}
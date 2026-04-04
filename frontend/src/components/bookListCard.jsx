export default function BookListCard({book}){
    
    return(
    <div id={book._id} className="w-full bg-orange-200 p-2 rounded">
        <h2>{book.titulo}</h2>
        <div className="flex justify-between">
            <p className="little-text">Autor: {book.autor}</p>
            <p className="little-text">Ano: {book.ano_publicacao}</p>
        </div>
    </div>)
}
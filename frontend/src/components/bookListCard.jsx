export default function BookListCard(book){
    console.log(book)
    return(
    <div data-id={book._id} className="w-full">
        <h2>{book.titulo}</h2>
        <div className="flex justify-between">
            <p className="little-text">Autor: {book.autor}</p>
            <p className="little-text">Ano: {book.ano_publicacao}</p>
        </div>
    </div>)
}
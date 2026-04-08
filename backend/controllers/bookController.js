import Book from "../models/book.class.js";

async function _paginacao(req, query = {}){
    const reqPage = req.page;
    const reqSizePage = req.sizePage;

    let page = parseInt(reqPage) - 1;
    let sizePage = parseInt(reqSizePage);

    if(isNaN(page) || page < 0) page = 0;
    if(isNaN(sizePage) || sizePage < 0) sizePage = 10;

    let invalid = true;
    try {
        const total = await Book.countDocuments(query);
        const totalPages = Math.floor(total / sizePage) + 1;

        invalid = false;
        if(page + 1 > totalPages) {
            page = totalPages - 1
        }
        return { page, totalPages, sizePage, totalBooks: total, invalid }
    } catch(error) {
        console.log(error)
    }
    return { invalid }
}

export async function findBooks(req, res){
    const { titulo, autor, isbn, ano_publicacao } = req.query;
    let query = {};
    if(titulo) query.titulo = titulo;
    if(autor) query.autor = autor;
    if(isbn) query.isbn = isbn;
    if(ano_publicacao) query.ano_publicacao = ano_publicacao;

    try {
        const {page, totalPages, sizePage, totalBooks, invalid} = await _paginacao(req.query, query);

        if(invalid){
            res.status(422).json({message: "Essa página não existe", status: "failed", page: page + 1, totalPages, sizePage, totalBooks});
            return;
        }

        const books = await Book.find(query)
        .sort({titulo: 1})
        .skip(page * sizePage)
        .limit(sizePage);

        res.status(200).json({message: "Requisição executada com sucesso!", status: "sucess", result: books, page: page + 1, totalPages, sizePage, resultSize: books.length, totalBooks});
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Requisição falhou!", status: "failed", result: error});
    }
}

export async function getBookByID(req, res){
    const bookID = req.params.id;

    try {
        const book = await Book.findById(bookID)
        
        res.status(200).json({message: "Requisição executada com sucesso!", status: "sucess", result: book});
    } catch(error) {
        res.status(500).json({message: "Requisição falhou!", status: "failed", result: error});
    }
}

export async function getBooksByAutor(req, res){
    const autor = req.params.autor;
    const query = {autor: autor};
    try {
        const {page, totalPages, sizePage, totalBooks, invalid} = await _paginacao(req.query, query);

        if(invalid){
            res.status(422).json({message: "Essa página não existe", status: "failed", page: page + 1, totalPages, sizePage, totalBooks});
            return;
        }

        const books = await Book.find(query)
        .sort({titulo: 1})
        .skip(page * sizePage)
        .limit(sizePage);

        res.status(200).json({message: "Requisição executada com sucesso!", status: "sucess", result: books, page: page + 1, totalPages, sizePage, resultSize: books.length, totalBooks});
    } catch(error) {
        res.status(500).json({message: "Requisição falhou!", status: "failed", result: error});
    }
}

export async function getAllBooks(req, res){
    try {
        const {page, totalPages, sizePage, totalBooks, invalid} = await _paginacao(req.query);

        if(invalid){
            res.status(422).json({message: "Essa página não existe", status: "failed", page: page + 1, totalPages, sizePage, totalBooks});
            return;
        }

        const books = await Book.find()
        .sort({titulo: 1})
        .skip(page * sizePage)
        .limit(sizePage);

        res.status(200).json({message: "Requisição executada com sucesso!", status: "sucess", result: books, page: page + 1, totalPages, sizePage, resultSize: books.length, totalBooks});
    } catch(error) {
        res.status(500).json({message: "Requisição falhou!", status: "failed", result: error});
    }
}

export async function addBookOnStock(req, res){
    const bookID = req.params.id;
    const { quant } = req.query;

    let validQuant = parseInt(quant);
    if(isNaN(validQuant)){
        validQuant = 1;
    }
    try {
        const book = await Book.findById(bookID);

        if(!book) {
            res.status(422).json({message: "Livro não encontrado!", status: "failed", result: book}); 
            return;
        }
        
        if(book.quantidade_estoque){
            book.quantidade_estoque += validQuant;
        } else {
            book.quantidade_estoque = validQuant;
        }
        
        const status = await book.save()
        res.status(200).json({message: "Requisição executada com sucesso!", status: "sucess", result: status});
    } catch(error) {
        res.status(500).json({message: "Requisição falhou!", status: "failed", result: error});
    }
}

function _montagemDeMensagem(itensFaltantes){
    let message = itensFaltantes[0];

    let i = 1;
    while(i < itensFaltantes.length){
        message += ", ";
        message += itensFaltantes[i];
        i += 1;
    }


    if(i > 1){
        message += " são itens obrigatórios!";
    } else {
        message += " é um item obrigatório!";
    }

    return message;
}

async function _isBookRegistered(isbn, quantidade_estoque){
    try{
        const bookRegistered = await Book.findOne({isbn: isbn});
        if(!bookRegistered){
            return false;
        }
        if(bookRegistered.quantidade_estoque){
            bookRegistered.quantidade_estoque += quantidade_estoque;
        } else {
            bookRegistered.quantidade_estoque = quantidade_estoque;
        }

        bookRegistered.save();
        return true;
    } catch(error) {}
    return false;
}

export async function createBook(req, res){
    if(!req.body){
        res.status(422).json({message: "Não foi enviado nenhuma informação", status: "failed"});
        return;
    }

    const {titulo, autor, isbn, ano_publicacao, quantidade_estoque} = req.body;
    
    const itensFaltantes = [];
    if(!titulo) itensFaltantes.push("Titulo");
    if(!autor) itensFaltantes.push("Autor");
    if(!isbn) itensFaltantes.push("ISBN");

    if(itensFaltantes.length > 0) {
        const message = _montagemDeMensagem(itensFaltantes)

        res.status(422).json({message, status: "failed"}); 
        return;
    }


    let quantidade_estoque_valida = parseInt(quantidade_estoque);
    if(isNaN(quantidade_estoque_valida) || quantidade_estoque_valida < 0){
        quantidade_estoque_valida = 0;
    }
    if(await _isBookRegistered(isbn, quantidade_estoque_valida)){
        res.status(200).json({message: "Livro já está cadastrado, foi adicionado ao estoque", status: "sucess"});
        return;
    }

    let ano_publicacao_valida = parseInt(ano_publicacao);
    const anoAtual = new Date().getFullYear();
    if(isNaN(ano_publicacao_valida) || ano_publicacao_valida < 0 || ano_publicacao_valida > anoAtual){
        ano_publicacao_valida = undefined;
    }

    const newBook = new Book({
        titulo,
        autor,
        isbn,
        ano_publicacao: ano_publicacao_valida,
        quantidade_estoque: quantidade_estoque_valida
    })
    try {
        const savedBook = await newBook.save();
        res.status(200).json({message: "Livro cadastrado com sucesso!", status: "sucess", result: savedBook});
    } catch( error ) {
        res.status(500).json({message: "Problema ao cadastrar o livro!", status: "failed", result: error});
    }
}

export async function updateBook(req, res){
    const {titulo, autor, isbn, ano_publicacao, quantidade_estoque} = req.body;

    let updated = false;
    try {
        const book = await Book.findById(bookID);

        if(titulo) {book.titulo = titulo; updated = true;}
        if(autor) {book.autor = autor; updated = true;}
        if(isbn) {book.isbn = isbn; updated = true;}
        if(ano_publicacao) {book.ano_publicacao = ano_publicacao; updated = true;}
        if(quantidade_estoque) {book.quantidade_estoque = quantidade_estoque; updated = true;}

        if(updated){
            await book.save();
            res.status(200).json({message: "Livro atualizado com sucesso!", status: "sucess", result: task});
        } else {
            res.status(422).json({message: "Livro não foi atualizado! Atributos inválidos!", status: "failed", result: task});
        }
    } catch(error) {
        res.status(500).json({message: "Falha ao atualizar o livro!", status: "failed", result: error});
    }
}

export async function deleteBook(req, res){
    const bookID = req.params.id;
    try {
        const book = await Book.deleteOne({_id: bookID})
        res.status(200).json({message: "Livro deletado com sucesso!", status: "sucess", result: book});
    } catch(error) {
        res.status(500).json({message: "Problema ao deletar livro!", status: "failed", result: error});
    }
}
# Execicio Livros - LabDev

# Tecnologias
- Front End: React e Tailwind
- Back End: Express.js
- Banco: MongoDB

# Back End
## Model Livros
- titulo:String (Obrigatório)
- autor:String (Obrigatório)
- isbn:String identificador de livros (Obrigatório)
- ano_publicacao: Uint16
- quantidade_estoque Uint32

## Controller
- getAll()
- getById(id:String)
- getByAutor(autor:String)
- createNew(book:Object)
- addBookOnStock(id:String, quant:Uint32)

# Front End
## Telas
1. Listar Livros
- Input para busca de autor (caso não ache mostrar mensagem, não foram encontrados livros para o autor)
2. Cadastrar Livro
3. Adicionar livros no estoque

---
**Posteriormente:**
4. Pagina Livro
- Adicionar ao estoque (Aparece interface perguntando quantos)
5. Atualizar Livro


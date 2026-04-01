# Execicio Livros - LabDev

## Tecnologias
- Front End: React e Tailwind
- Back End: Express.js
- Banco: MongoDB

## Enunciado do Exercicio
1.	Desenvolva uma API backend, com Node.js (Express) e banco de dados MongoDB que implemente o seguinte:
a.	Cadastro de Livros com os seguintes campos: titulo, autor (string), isbn (string), ano_publicacao (número), e quantidade_estoque (número). Validação: Garantir que o titulo, autor e isbn sejam obrigatórios.
b.	busca e retorna todos os livros;
c.	busca e retorna todos os livros de um autor específico, usando o nome do autor;
d.	sempre que um exemplar de um livro já cadastrado for adquirido aumentar o campo quantidade_estoque 

2.	Desenvolva o frontend, com react/tailwind que consuma o backend. Esse item você desenvolverá em casa e entregará no dia 29/10/2025 na tarefa criada no teams. Não se esqueça de copiar o backend para essa atividade.
Observações: 
•	No frontend para dar entrada de livros no estoque criar uma interface onde será digitada a quantidade e escolhido o livro;
•	No frontend para buscar e mostra os livros de um autor, criar uma interface onde o usuário digite o nome do autor. Caso não encontre nenhum livro do autor digitado forneça uma mensagem “Não foram encontrados livros para o autor

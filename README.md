[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/-qNZWrD0)
# Trabalho Prático - Semana 12

Fetch API + The Movie DB (TMDB). Catálogo de filmes que consome dados reais da API do TMDB, exibe os resultados em cards e permite busca por nome.

## Informações Gerais

- Nome: Lucas Oliveira Dias
- Matrícula: 907253

## Estrutura do projeto

- `public/index.html` — página do catálogo
- `public/assets/css/styles.css` — estilos (tema escuro)
- `public/assets/scripts/app.js` — lógica de requisição e renderização

## Endpoint utilizado

- Lista inicial: `GET /movie/popular` (filmes populares)
- Busca: `GET /search/movie?query=...` (pesquisa por nome)

## Fluxo (requisição → tratamento → renderização)

A função `fetchMovies()` monta a URL (populares quando não há busca, `/search/movie` quando há texto) e faz a requisição com a Fetch API usando `async/await`. A resposta é convertida com `.json()` e o array `results` é repassado para `renderMovies()`, que limpa o container e gera um card por filme via `createMovieCard()` (createElement / classList / appendChild). Estados de carregando, vazio e erro são exibidos por `showMessage()`.

## Prints

Lista de filmes carregada (populares):

![lista](public/img/lista.png)

Resultado após a busca:

![busca](public/img/busca.png)

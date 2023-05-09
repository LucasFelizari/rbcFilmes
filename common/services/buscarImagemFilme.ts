import axios from "axios";

export default async function buscarImagemFilme(nomeFilme) {
    
    // Insira sua chave de API do TMDB abaixo
    const apiKey = '2c67069abcd100465b91032ed8542413';

    // Faz uma solicitação GET para a API do TMDB com o nome do filme como parâmetro
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${nomeFilme}`);

    // Obtém o ID do filme a partir da resposta da API
    const movieId = response.data.results[0].id;

    // Faz uma solicitação GET para a API do TMDB para obter informações sobre o filme
    const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);

    // Retorna a URL da capa do filme
    console.log(`https://image.tmdb.org/t/p/w500${movieResponse.data.poster_path}`)

    return `https://image.tmdb.org/t/p/w500${movieResponse.data.poster_path}`;

}
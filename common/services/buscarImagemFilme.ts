import axios from "axios";

export default async function buscarImagemFilme(nomeFilme) {

    const apiKey = '2c67069abcd100465b91032ed8542413';
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${nomeFilme}`);
    const movieId = response.data.results[0].id;
    const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);

    return `https://image.tmdb.org/t/p/w500${movieResponse.data.poster_path}`;

}
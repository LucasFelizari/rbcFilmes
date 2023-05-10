import axios from "axios";
import obterIdDmdb from "./obterIdDmdb";

export default async function buscarImagemFilme(nomeFilme) {

    const chaveApi = '2c67069abcd100465b91032ed8542413';
    const movieId = await obterIdDmdb(nomeFilme);
    const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${chaveApi}`);

    return `https://image.tmdb.org/t/p/w500${movieResponse.data.poster_path}`;
}
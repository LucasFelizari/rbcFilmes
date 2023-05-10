import axios from "axios";
import obterIdDmdb from "./obterIdDmdb";

export default async function obterResumoFilme(nomeFilme){
    const chaveApi = '2c67069abcd100465b91032ed8542413';
    const movieId = await obterIdDmdb(nomeFilme);

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${chaveApi}&append_to_response=overview`);

    const movieOverview = response.data.overview;
  console.log( response.data);
    return movieOverview;


}
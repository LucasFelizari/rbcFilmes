import axios from "axios";

export default async function obterIdDmdb(nomeFilme) {
    const chaveApi = '2c67069abcd100465b91032ed8542413';

    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${chaveApi}&query=${nomeFilme}`);
    return response.data.results[0].id;
}
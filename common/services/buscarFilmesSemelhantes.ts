import { IFilmeDto } from "../types/IFilmeDto";
import stringSimilarity from 'string-similarity';

export default async function buscarFilmesSemelhantes(filme: IFilmeDto): Promise<IFilmeDto[] | undefined> {
    const csv = require('csv-parse');
    let filmes: IFilmeDto[] | undefined;
    const filmesSemelhantes: IFilmeDto[] = [];

    const response = await fetch('/filmes.csv');
    const text = await response.text();

    filmes = await new Promise((resolve, reject) => {
        csv.parse(text, { columns: true }, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });

    filmes = filmes.filter(x => x.id !== filme.id);

    // calcular similaridade de cada filme com o filme dado
    filmes.forEach(f => {
        let totalSimilarity = 0;

        // similaridade de título original
        const originalTitleSimilarity = calcularSimilaridade(f.original_title, filme.original_title);
        totalSimilarity += (originalTitleSimilarity * 0.15);

        // similaridade de título
        const titleSimilarity = calcularSimilaridade(f.title, filme.title);
        totalSimilarity += (titleSimilarity * 0.15);

        // similaridade de gêneros
        const genreSimilarity = calcularSimilaridadeEntreGeneros(filme?.genres, f.genres)
        totalSimilarity += (genreSimilarity * 0.3);

        // similaridade de empresas de produção
        const companySimilarity = calcularSimilaridadeEntreEmpresasDeProducao(filme.production_companies, f.production_companies)
        totalSimilarity += (companySimilarity * 0.2);

        // similaridade de popularidade
        const popularitySimilarity = calcularSimilaridadeEntrePopularidade(f.popularity, filme.popularity);
        totalSimilarity += (popularitySimilarity * 0.1);

        // similaridade de avaliação
        const voteSimilarity = calcularSimilaridadeEntreNotas(f.vote_average, filme.vote_average);
        totalSimilarity += (voteSimilarity * 0.1);

        f.totalSimilarity = totalSimilarity < 0 ? totalSimilarity * (-1) : totalSimilarity;
        //console.log('similaridade total:' + f.totalSimilarity);
    });

    // ordenar filmes pela similaridade total em ordem decrescente
    filmes = filmes.sort((a, b) => (b.totalSimilarity || 0) - (a.totalSimilarity || 0));

    filmes.slice(0, 5).forEach(f => {
            console.log(f.title + ' similaridade ' + f.totalSimilarity);
        });

    // retornar os 5 filmes mais semelhantes
    return filmes.slice(0, 5);

}

function calcularSimilaridade(str1: string, str2: string): number {
    return stringSimilarity.compareTwoStrings(str1, str2);
}

function calcularSimilaridadeEntreEmpresasDeProducao(empresas1, empresas2) {
    const empresas1Array = Array.isArray(empresas1) ? empresas1 : [empresas1];
    const empresas2Array = Array.isArray(empresas2) ? empresas2 : [empresas2];

    const allEmpresas = [...new Set([...empresas1Array, ...empresas2Array])];

    let similaridade = 0;
    allEmpresas.forEach(empresa => {
        const empresa1Exists = empresas1Array.find(e => e.name === empresa.name);
        const empresa2Exists = empresas2Array.find(e => e.name === empresa.name);
        if (empresa1Exists && empresa2Exists) {
            similaridade += 1 / allEmpresas.length;
        } else if (empresa1Exists || empresa2Exists) {
            similaridade += 0.5 / allEmpresas.length;
        }
    });
    return similaridade;
}


function calcularSimilaridadeEntreGeneros(genres1, genres2) {
    const genres1Array = Array.isArray(genres1) ? genres1 : [genres1];
    const genres2Array = Array.isArray(genres2) ? genres2 : [genres2];

    const allGenres = [...new Set([...genres1Array, ...genres2Array])];

    let similaridade = 0;
    allGenres.forEach(genre => {
        const genre1Exists = genres1Array.includes(genre);
        const genre2Exists = genres2Array.includes(genre);
        if (genre1Exists && genre2Exists) {
            similaridade += 1 / allGenres.length;
        } else if (genre1Exists || genre2Exists) {
            similaridade += 0.5 / allGenres.length;
        }
    });
    return similaridade;
}

//Similaridade entre Notas
function calcularSimilaridadeEntreNotas(num1, num2) {
    return (1 - (num2 - num1) / (10 - 0));
}

//Similaridade entre Popularidade
function calcularSimilaridadeEntrePopularidade(num1, num2) {
    return (1 - (num2 - num1) / (875581305 - 0));
}
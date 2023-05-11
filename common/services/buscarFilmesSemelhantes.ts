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

        // similaridade de título
        const titleSimilarity = calcularSimilaridade(f.title, filme.title);
        const originalTitleSimilarity = calcularSimilaridade(f.original_title, filme.original_title);
        const maxTitleSimilarity = Math.max(titleSimilarity, originalTitleSimilarity);
        totalSimilarity += maxTitleSimilarity;

        // similaridade de gêneros
       // const genres1 = filme?.genres?.map(g => g.name);
       // const genres2 = f.genres.map(g => g.name);
        const genreSimilarity = calcularSimilaridadeEntreGeneros(filme?.genres, f.genres)
        totalSimilarity += genreSimilarity;

        // similaridade de empresas de produção
        //const productionCompanies1 = filme.production_companies.map(c => c.name);
       // const productionCompanies2 = f.production_companies.map(c => c.name);
        const companySimilarity = calcularSimilaridadeEntreEmpresasDeProducao(filme.production_companies, f.production_companies)
        totalSimilarity += companySimilarity;

        // similaridade de popularidade
        const popularitySimilarity = calcularSimilaridadeEntreNumeros(f.popularity, filme.popularity);
        totalSimilarity += popularitySimilarity;

        // similaridade de avaliação
        const voteSimilarity = calcularSimilaridadeEntreNumeros(f.vote_average, filme.vote_average);
        totalSimilarity += voteSimilarity;

        f.totalSimilarity = totalSimilarity;
    });

    // ordenar filmes pela similaridade total em ordem decrescente
    filmes = filmes.sort((a, b) => (b.totalSimilarity || 0) - (a.totalSimilarity || 0));

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

function calcularSimilaridadeEntreDatas(data1: string, data2: string): number {
    const milissegundosPorDia = 1000 * 60 * 60 * 24;
    const diferencaEmMilissegundos = Math.abs(Date.parse(data1) - Date.parse(data2));
    const maxDiferencaEmMilissegundos = milissegundosPorDia * 365; // um ano em milissegundos
    const similaridade = 1 - diferencaEmMilissegundos / maxDiferencaEmMilissegundos;
    return similaridade;
}
//Similaridade entre Numeros

function calcularSimilaridadeEntreNumeros(num1, num2) {
    return (1 - (num2 - num1) / (10 - 0));
}



// export default async function buscarFilmesSemelhantes(filme: IFilmeDto): Promise<IFilmeDto[] | undefined> {
    // const csv = require('csv-parse');
    // let filmes: IFilmeDto[] | undefined;
    // const filmesSemelhantes: IFilmeDto[] = [];

    // const response = await fetch('/filmes.csv');
    // const text = await response.text();

    // filmes = await new Promise((resolve, reject) => {
    //     csv.parse(text, { columns: true }, (err, rows) => {
    //         if (err) reject(err);
    //         resolve(rows);
    //     });
    // });

//     filmes = filmes.filter(x => x.id !== filme.id);

//     filmes.forEach((f) => {
//         var batatinha = 0;
//         //ORIGINAL TITLE - 3.0
//         // Verificar a similaridade entre os títulos originais dos filmes
//         const similaridadeTituloOriginal = stringSimilarity.compareTwoStrings(filme.original_title, f.original_title);
//         batatinha += similaridadeTituloOriginal * 3;


//         //TITLE - 2.0
//         // Verificar a similaridade entre os títulos dos filmes
//         const similaridadeTitulo = stringSimilarity.compareTwoStrings(filme.title, f.title);
//         batatinha += similaridadeTitulo * 2;


//         //GENERO - 2.0
//         //Verificar a similaridade entre os generos dos filmes
//         const similaridadeGenero = stringSimilarity.compareTwoStrings(filme.genres, f.genres);
//         batatinha += similaridadeGenero * 2;


//         //VOTE_AVERAGE - 1.0
//         // Verificar a similaridade entre as notas dos filmes
//         const similaridadeNota = calcularSimilaridadeEntreNumeros(filme.vote_average, f.vote_average);
//         batatinha += similaridadeNota;


//         //PRODUCT_COMPANY - 1.0
//         // Verificar a similaridade entre as empresas produtoras
//         const similaridadeProdutoras = stringSimilarity.compareTwoStrings(filme.production_companies, f.production_companies);
//         batatinha += similaridadeProdutoras;

//         //POPULARIDADE - 1.0
//         // Verificar a similaridade entre a popularidade dos filmes
//         const similaridadePopularidade = calcularSimilaridadeEntreNumeros(filme.popularity, f.popularity);
//         batatinha += similaridadePopularidade;

//         f.totalSimilarity = batatinha;
//     });

//     // Retornar os 5 filmes com maior similaridade
//     return filmes.sort(f => f.totalSimilarity).slice(0, 5);

// }

// function calcularSimilaridadeTotal(filme: IFilmeDto, outroFilme: IFilmeDto): number {
//     // Calcular a similaridade total entre os filmes com base nas similaridades de título, data e orçamento
//     const similaridadeTitulo = stringSimilarity.compareTwoStrings(filme.title, outroFilme.title);
//     const dataFilme = new Date(filme.release_date);
//     const dataOutroFilme = new Date(outroFilme.release_date);
//     const similaridadeData = calcularSimilaridadeEntreDatas(dataFilme, dataOutroFilme);
//     const similaridadeOrcamento = calcularSimilaridadeEntreNumeros(filme.budget, outroFilme.budget);
//     return similaridadeTitulo + similaridadeData + similaridadeOrcamento;
// }

// function calcularSimilaridadeEntreDatas(data1: Date, data2: Date): number {
//     const milissegundosPorDia = 1000 * 60 * 60 * 24;
//     const diferencaEmMilissegundos = Math.abs(data1.getTime() - data2.getTime());
//     const maxDiferencaEmMilissegundos = milissegundosPorDia * 365; // um ano em milissegundos
//     const similaridade = 1 - diferencaEmMilissegundos / maxDiferencaEmMilissegundos;
//     return similaridade;
// }

// function calcularSimilaridadeEntreNumeros(num1, num2) {
//     return (1 - (num2 - num1) / (10 - 0));
// }

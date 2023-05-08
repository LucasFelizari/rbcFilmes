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

    filmes.forEach((f) => {
        // Verificar a similaridade entre os títulos dos filmes
        const similaridadeTitulo = stringSimilarity.compareTwoStrings(filme.title, f.title);

        // Verificar a similaridade entre as datas de lançamento dos filmes
        const dataFilme = new Date(filme.release_date);
        const dataOutroFilme = new Date(f.release_date);
        const similaridadeData = calcularSimilaridadeEntreDatas(dataFilme, dataOutroFilme);

        // Verificar a similaridade entre os orçamentos dos filmes
        const similaridadeOrcamento = calcularSimilaridadeEntreNumeros(filme.budget, f.budget);

        // Se a similaridade entre os três aspectos for maior ou igual a 0.5, adiciona o filme à lista de filmes semelhantes
        if (similaridadeTitulo >= 0.5 && similaridadeData >= 0.5 && similaridadeOrcamento >= 0.5) {
            filmesSemelhantes.push(f);
        }
    });

    // Retornar os 5 filmes com maior similaridade
    const batata = filmesSemelhantes
        .sort((a, b) => {
            // Ordenar por ordem decrescente de similaridade
            const similaridadeA = calcularSimilaridadeTotal(filme, a);
            const similaridadeB = calcularSimilaridadeTotal(filme, b);
            return similaridadeB - similaridadeA;
        })
        .slice(0, 5);
        console.log(batata);
        return batata;
}

function calcularSimilaridadeTotal(filme: IFilmeDto, outroFilme: IFilmeDto): number {
    // Calcular a similaridade total entre os filmes com base nas similaridades de título, data e orçamento
    const similaridadeTitulo = stringSimilarity.compareTwoStrings(filme.title, outroFilme.title);
    const dataFilme = new Date(filme.release_date);
    const dataOutroFilme = new Date(outroFilme.release_date);
    const similaridadeData = calcularSimilaridadeEntreDatas(dataFilme, dataOutroFilme);
    const similaridadeOrcamento = calcularSimilaridadeEntreNumeros(filme.budget, outroFilme.budget);
    return similaridadeTitulo + similaridadeData + similaridadeOrcamento;
}

function calcularSimilaridadeEntreDatas(data1: Date, data2: Date): number {
    const milissegundosPorDia = 1000 * 60 * 60 * 24;
    const diferencaEmMilissegundos = Math.abs(data1.getTime() - data2.getTime());
    const maxDiferencaEmMilissegundos = milissegundosPorDia * 365; // um ano em milissegundos
    const similaridade = 1 - diferencaEmMilissegundos / maxDiferencaEmMilissegundos;
    return similaridade;
}


function calcularSimilaridadeEntreNumeros(num1, num2) {
    return (1 - (num2 - num1) / (10 - 0));
}

// //#region Similaridade de String

//     //Biblioteca 'string-similarity'
//     const stringSimilarity = require('string-similarity');
//     function calcularSimilaridade(str1,str2) {
//     return stringSimilarity.compareTwoStrings(str1, str2);
//     }

//     //Exemplo:
//     const string1 = 'Hello World';
//     const string2 = 'Hello World!';
//     const similaridadeString = calcularSimilaridade(string1, string2);
//     console.log(similaridade);

// //#endregion Similaridade de String


// //#region Similaridade entre Datas

//     function calcularSimilaridadeEntreDatas(data1, data2) {
//         const milissegundosPorDia = 1000 * 60 * 60 * 24;
//         const diferencaEmMilissegundos = Math.abs(data1 - data2);
//         const maxDiferencaEmMilissegundos = milissegundosPorDia * 365; // um ano em milissegundos
//         const similaridade = 1 - diferencaEmMilissegundos / maxDiferencaEmMilissegundos;
//         return similaridade;
//       }

//     //Exemplo:
//     const data1 = new Date('2023-05-05');
//     const data2 = new Date('2023-05-10');
//     const similaridadeData = calcularSimilaridadeEntreDatas(data1, data2);
//     console.log(similaridade);

// //#endregion Similaridade entre Datas


// //#region Similaridade entre Numeros

//     function calcularSimilaridadeEntreNumeros(num1, num2) {
//         return (1 - (num2 - num1) / (10 - 0));
//     }

//     //Exemplo:
//     const num1 = Number(0.5);
//     const num2 = Number(5.2);
//     const similaridadeNumeros = calcularSimilaridadeEntreNumeros(num1, num2);
//     console.log(similaridadeNumeros);

// //#endregion Similaridade entre Numeros
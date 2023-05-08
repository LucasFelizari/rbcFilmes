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
        if (similaridadeTitulo >= 0.3 && similaridadeData >= 0.3 && similaridadeOrcamento >= 0.3) {
            filmesSemelhantes.push(f);
        }
    });

    // Retornar os 5 filmes com maior similaridade
   return filmesSemelhantes
        .sort((a, b) => {
            // Ordenar por ordem decrescente de similaridade
            const similaridadeA = calcularSimilaridadeTotal(filme, a);
            const similaridadeB = calcularSimilaridadeTotal(filme, b);
            return similaridadeB - similaridadeA;
        })
        .slice(0, 5);
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

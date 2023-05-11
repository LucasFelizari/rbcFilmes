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
        var batatinha = 0;
        //ORIGINAL TITLE - 3.0
        // Verificar a similaridade entre os títulos originais dos filmes
        const similaridadeTituloOriginal = stringSimilarity.compareTwoStrings(filme.original_title, f.original_title);
        batatinha += similaridadeTituloOriginal * 3;


        //TITLE - 2.0
        // Verificar a similaridade entre os títulos dos filmes
        const similaridadeTitulo = stringSimilarity.compareTwoStrings(filme.title, f.title);
        batatinha += similaridadeTitulo * 2;


        //GENERO - 2.0
        //Verificar a similaridade entre os generos dos filmes
        const similaridadeGenero = stringSimilarity.compareTwoStrings(filme.genres, f.genres);
        batatinha += similaridadeGenero * 2;


        //VOTE_AVERAGE - 1.0
        // Verificar a similaridade entre as notas dos filmes
        const similaridadeNota = calcularSimilaridadeEntreNumeros(filme.vote_average, f.vote_average);
        batatinha += similaridadeNota;


        //PRODUCT_COMPANY - 1.0
        // Verificar a similaridade entre as empresas produtoras
        const similaridadeProdutoras = stringSimilarity.compareTwoStrings(filme.production_companies, f.production_companies);
        batatinha += similaridadeProdutoras;

        //POPULARIDADE - 1.0
        // Verificar a similaridade entre a popularidade dos filmes
        const similaridadePopularidade = calcularSimilaridadeEntreNumeros(filme.popularity, f.popularity);
        batatinha += similaridadePopularidade;

        f.totalSimilarity = batatinha;
    });

    // Retornar os 5 filmes com maior similaridade
    return filmes.sort(f => f.totalSimilarity).slice(0, 5);

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

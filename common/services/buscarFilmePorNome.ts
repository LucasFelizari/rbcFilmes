import { IFilmeDto } from "../types/IFilmeDto";

export default function buscarFilmePorNome(filmes: IFilmeDto[], nome: string): IFilmeDto | undefined {
    let filmeMaisSimilar: IFilmeDto | undefined;
    let menorDistancia = Number.MAX_SAFE_INTEGER;
  
    for (const filme of filmes) {
      const distancia = levenshteinDistance(nome.toLowerCase(), filme.title.toLowerCase());
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        filmeMaisSimilar = filme;
      }
    }
  
    return filmeMaisSimilar;
  }
  
  function levenshteinDistance(s: string, t: string): number {
    const d = [];
    for (let i = 0; i <= s.length; i++) {
      d[i] = [i];
    }
    for (let j = 0; j <= t.length; j++) {
      d[0][j] = j;
    }
    for (let j = 1; j <= t.length; j++) {
      for (let i = 1; i <= s.length; i++) {
        if (s.charAt(i - 1) === t.charAt(j - 1)) {
          d[i][j] = d[i - 1][j - 1];
        } else {
          const substitutionCost = d[i - 1][j - 1] + 1;
          const insertionCost = d[i][j - 1] + 1;
          const deletionCost = d[i - 1][j] + 1;
          d[i][j] = Math.min(substitutionCost, insertionCost, deletionCost);
        }
      }
    }
    return d[s.length][t.length];
  }
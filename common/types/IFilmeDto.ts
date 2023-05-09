export interface IFilmeDto {
    budget: number;
    genres: Array<{
        id: number;
        name: string;
    }>;
    homepage: string;
    id: number;
    keywords: Array<{
        id: number;
        name: string;
    }>;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    production_companies: Array<{
        id: number;
        name: string;
    }>;
    production_countries: Array<{
        iso_3166_1: string;
        name: string;
    }>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<{
        iso_639_1: string;
        name: string;
    }>;
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;
    totalSimilarity?: number;
}
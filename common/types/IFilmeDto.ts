interface IGenre {
    id: number;
    name: string;
}

export interface IFilmeDto {
    budget: number;
    genres: IGenre[];
    homepage: string;
    id: number;
    keywords: [{
        id: number;
        name: string;
    }];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    production_companies: [{
        id: number;
        name: string;
    }];
    production_countries: [{
        iso_3166_1: string;
        name: string;
    }];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: [{
        iso_639_1: string;
        name: string;
    }];
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;
    totalSimilarity?: number;
}
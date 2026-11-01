export enum NewsApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export type NewsApiStatus = 'ok' | 'error';

export interface NewsApiQueryParams {
    apiKey: string;
    sources: string;
}

export type NewsApiQuery = Partial<NewsApiQueryParams>;

export interface NewsApiSource {
    id: string | null;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface NewsApiArticle {
    source: Pick<NewsApiSource, 'id' | 'name'>;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content?: string | null;
}

export interface NewsApiSourcesResponse {
    status: NewsApiStatus;
    sources?: NewsApiSource[];
    code?: string;
    message?: string;
}

export interface NewsApiArticlesResponse {
    status: NewsApiStatus;
    totalResults?: number;
    articles?: NewsApiArticle[];
    code?: string;
    message?: string;
}

export type ReadonlyNewsApiSource = Readonly<NewsApiSource>;

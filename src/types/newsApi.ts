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
    status: 'ok' | 'error';
    sources?: NewsApiSource[];
    code?: string;
    message?: string;
}

export interface NewsApiArticlesResponse {
    status: 'ok' | 'error';
    totalResults?: number;
    articles?: NewsApiArticle[];
    code?: string;
    message?: string;
}

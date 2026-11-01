import News from './news/news';
import Sources from './sources/sources';

interface SourcesResponse {
    sources?: Source[];
}
interface NewsResponse {
    articles?: Article[];
}
interface Source {
    id: string;
    name: string;
}
interface Article {
    author: string | null;
    source: { name: string };
    publishedAt: string;
    urlToImage: string | null;
    title: string;
    description: string;
    url: string;
}

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: unknown): void {
        const response = data as NewsResponse | null;
        const values = response?.articles ?? [];
        this.news.draw(values);
    }

    drawSources(data: unknown): void {
        const response = data as SourcesResponse | null;
        const values = response?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;

import News from './news/news';
import Sources from './sources/sources';

interface SourcesResponse { sources?: Source[] }
interface NewsResponse { articles?: Article[] }
interface Source { id: string; name: string }
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

    drawNews(data: NewsResponse): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

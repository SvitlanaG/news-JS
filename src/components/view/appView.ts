import News from './news/news';
import Sources from './sources/sources';
import { NewsApiArticlesResponse, NewsApiSourcesResponse } from '../../types/newsApi';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(response: NewsApiArticlesResponse): void {
        const values = response?.articles ?? [];
        this.news.draw(values);
    }

    drawSources(response: NewsApiSourcesResponse): void {
        const values = response?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;

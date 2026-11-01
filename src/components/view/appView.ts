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

    public drawNews(response: NewsApiArticlesResponse): void {
        if (response.status === 'error') {
            this.showError(response.message || 'Could not load articles. Please try again.');
            return;
        }

        const values = response?.articles ?? [];
        this.news.draw(values);
        if (values.length === 0) this.showMessage('No articles were found for this source.');
        else this.clearStatus();
    }

    public drawSources(response: NewsApiSourcesResponse): void {
        if (response.status === 'error') {
            this.showError(response.message || 'Could not load news sources. Please try again.');
            return;
        }

        const values = response?.sources ?? [];
        this.sources.draw(values);
        if (values.length === 0) this.showMessage('No news sources are available right now.');
        else this.clearStatus();
    }

    public showLoading(message: string): void {
        this.setStatus(message, 'loading');
    }

    public showError(message: string): void {
        this.setStatus(message, 'error');
    }

    public clearStatus(): void {
        const status = document.querySelector<HTMLElement>('.app-status');
        if (!status) return;
        status.hidden = true;
        status.textContent = '';
    }

    private showMessage(message: string): void {
        this.setStatus(message, 'message');
    }

    private setStatus(message: string, state: 'loading' | 'error' | 'message'): void {
        const status = document.querySelector<HTMLElement>('.app-status');
        if (!status) return;
        status.dataset.state = state;
        status.setAttribute('role', state === 'error' ? 'alert' : 'status');
        status.setAttribute('aria-live', state === 'error' ? 'assertive' : 'polite');
        status.textContent = message;
        status.hidden = false;
    }
}

export default AppView;

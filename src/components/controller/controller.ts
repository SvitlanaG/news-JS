import AppLoader from './appLoader';
import { NewsApiArticlesResponse, NewsApiEndpoint, NewsApiSourcesResponse } from '../../types/newsApi';

class AppController extends AppLoader {
    public getSources(callback: (data: NewsApiSourcesResponse) => void): void {
        super.getResp(
            {
                endpoint: NewsApiEndpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: (data: NewsApiArticlesResponse) => void): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target && target !== newsContainer) {
            if (target.classList?.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    if (!sourceId) return;
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: NewsApiEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;

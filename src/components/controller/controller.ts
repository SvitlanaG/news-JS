import AppLoader from './appLoader';
import { RequestLifecycle } from './loader';
import { NewsApiArticlesResponse, NewsApiEndpoint, NewsApiSourcesResponse } from '../../types/newsApi';

class AppController extends AppLoader {
    public getSources(callback: (data: NewsApiSourcesResponse) => void, lifecycle: RequestLifecycle = {}): void {
        super.getResp(
            {
                endpoint: NewsApiEndpoint.Sources,
            },
            callback,
            lifecycle
        );
    }

    public getNews(
        e: Event,
        callback: (data: NewsApiArticlesResponse) => void,
        lifecycle: RequestLifecycle = {}
    ): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target && target !== newsContainer) {
            if (target.classList?.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (!sourceId) return;

                const sourceChanged = newsContainer.getAttribute('data-source') !== sourceId;
                newsContainer.querySelectorAll<HTMLButtonElement>('.source__item').forEach((sourceButton) => {
                    const isSelected = sourceButton.getAttribute('data-source-id') === sourceId;
                    sourceButton.classList.toggle('is-active', isSelected);
                    sourceButton.setAttribute('aria-pressed', String(isSelected));
                });

                if (sourceChanged) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: NewsApiEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback,
                        lifecycle
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;

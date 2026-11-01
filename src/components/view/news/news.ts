import './news.css';
import { NewsApiArticle } from '../../../types/newsApi';

class News {
    public draw(data: ReadonlyArray<Readonly<NewsApiArticle>>): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsContainer = document.querySelector<HTMLElement>('.news');
        if (!newsItemTemp || !newsContainer) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector<HTMLElement>('.news__item')?.classList.add('alt');

            newsClone.querySelector<HTMLElement>('.news__meta-photo')!.style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            newsClone.querySelector<HTMLElement>('.news__meta-author')!.textContent = item.author || item.source.name;
            newsClone.querySelector<HTMLElement>('.news__meta-date')!.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector<HTMLElement>('.news__description-title')!.textContent = item.title;
            newsClone.querySelector<HTMLElement>('.news__description-source')!.textContent = item.source.name;
            newsClone.querySelector<HTMLElement>('.news__description-content')!.textContent = item.description || '';
            newsClone.querySelector<HTMLAnchorElement>('.news__read-more a')!.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;

import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources = document.querySelector<HTMLElement>('.sources');
        if (!sources) return;
        sources.addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data), {
                onStart: () => this.view.showLoading('Loading articles…'),
                onError: (error) => this.view.showError(error.message),
            })
        );
        this.controller.getSources((data) => this.view.drawSources(data), {
            onStart: () => this.view.showLoading('Loading news sources…'),
            onError: (error) => this.view.showError(error.message),
        });
    }
}

export default App;

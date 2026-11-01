import Loader from './loader';
import { NewsApiQuery } from '../../types/newsApi';

class AppLoader extends Loader {
    constructor() {
        const useMocks = process.env.API_USE_MOCKS !== 'false';
        const baseUrl = process.env.API_URL || 'https://rss-news-api.onrender.com/';
        super(baseUrl, useMocks ? {} : { apiKey: process.env.API_KEY });
        this.useMocks = useMocks;
    }

    private useMocks: boolean;

    public getResp<T>(
        { endpoint, options = {} }: Readonly<{ endpoint: string; options?: NewsApiQuery }>,
        callback?: (data: T) => void
    ): void {
        super.getResp({ endpoint: this.useMocks ? `mocks/${endpoint}` : endpoint, options }, callback);
    }
}

export default AppLoader;

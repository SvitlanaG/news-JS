import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const useMocks = process.env.API_USE_MOCKS !== 'false';
        const baseUrl = process.env.API_URL || 'https://rss-news-api.onrender.com/';
        super(baseUrl, useMocks ? {} : { apiKey: process.env.API_KEY });
        this.useMocks = useMocks;
    }

    private useMocks: boolean;

    getResp<T>(
        { endpoint, options = {} }: { endpoint: string; options?: Record<string, string> },
        callback?: (data: T) => void
    ): void {
        super.getResp({ endpoint: this.useMocks ? `mocks/${endpoint}` : endpoint, options }, callback);
    }
}

export default AppLoader;

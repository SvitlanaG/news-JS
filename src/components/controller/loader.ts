import { NewsApiQuery } from '../../types/newsApi';

interface RequestOptions {
    endpoint: string;
    options?: NewsApiQuery;
}

class Loader {
    private baseLink: string;
    private options: NewsApiQuery;

    constructor(baseLink: string, options: NewsApiQuery) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: Readonly<RequestOptions>,
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: NewsApiQuery, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        const searchParams = new URLSearchParams();

        Object.entries(urlOptions).forEach(([key, value]) => {
            if (value) searchParams.set(key, value);
        });

        return `${this.baseLink}${endpoint}?${searchParams.toString()}`;
    }

    public load<T>(method: string, endpoint: string, callback: (data: T) => void, options: NewsApiQuery = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;

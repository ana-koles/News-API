import AppView, { NewsData, SourceData } from "../view/appView";

interface IntLoader {
    getResp (object: {endpoint: string, options?: RequestOptions}, callback: Function): void;
    makeUrl (options: RequestOptions, endpoint: string): string;
    load (method: string, endpoint: string, callback: Function, options: RequestOptions): void;
}

type RequestOptions = {[key: string]: string | number | boolean | null};

abstract class Callback {
    abstract getFunction (view: AppView): Function;
}

export class CallbackSources extends Callback {
    getFunction(view: AppView): Function {
        return (data: SourceData) => view.drawSources(data);
    }
}

export class CallbackNews extends Callback {
    getFunction(view: AppView): Function {
        return (data: NewsData) => view.drawNews(data);
    }
}

export type GetSourcesCallback = (data: SourceData) => void;

type Response = {
    ok: boolean,
    status: number,
    statusText: string,
    json(): Promise<Response>;
}

class Loader implements IntLoader {
    private baseLink: string;
    private options: RequestOptions;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        {endpoint, options = {}}: {endpoint: string, options?: RequestOptions},
        callback: Function = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    makeUrl(options: RequestOptions, endpoint: string) {
        const urlOptions: {[key: string]: string | number | boolean | null} = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: Function, options: RequestOptions = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: any) => callback(data))
            .catch((err: string) => console.error(err));
    }
}

export default Loader;

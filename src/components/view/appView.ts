import News from './news/news';
import Sources from './sources/sources';

export type NewsData = {
    articles: Articles[],
    status: string,
    totalResults: number,
}

export type Articles = {
    author: string | null,
    content: string,
    description: string,
    publishedAt: string,
    source: {
        id: string,
        name: string,
    },
    title: string,
    url: string,
    urlToImage: string,
}

export type SourceData = {
    status: string,
    sources: SourceDetails[],
}

export type SourceDetails = {
    category: string,
    country: string,
    description: string,
    id: string,
    language: string,
    name: string,
    url: string,
}

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData) {
        const values: Articles[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourceData) {
        const values: SourceDetails[]  = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

import './news.css';

type NewsData = {
    author: string | null,
    content: string,
    description: string,
    publishedAt: string,
    source: {
        id: string,
        name: string,},
    title: string,
    url: string,
    urlToImage: string,
}

class News {
    draw(data: NewsData[]) {

        const news: NewsData[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: NewsData, idx: number) => {
            if (newsItemTemp !== null) {
                const newsClone = newsItemTemp.content.cloneNode(true) as ParentNode | null;

                if (idx % 2 && newsClone !== null) {
                    let newsItem = newsClone.querySelector('.news__item') as HTMLElement;
                    newsItem.classList.add('alt');
                }

                if (newsClone !== null) {
                    let newsPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
                    newsPhoto.style.backgroundImage = `url(${
                        item.urlToImage || 'img/news_placeholder.jpg'
                    })`;

                    let newsAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
                    newsAuthor.textContent = item.author || item.source.name;

                    let newsDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
                    newsDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');

                    let descriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
                    descriptionTitle.textContent = item.title;

                    let descriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
                    descriptionSource.textContent = item.source.name;

                    let descriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;
                    descriptionContent.textContent = item.description;

                    let readMore = newsClone.querySelector('.news__read-more a') as HTMLElement;
                    readMore.textContent = 'href', item.url;

                    fragment.append(newsClone);
               }
            }

        });

        let newsDoc = document.querySelector('.news') as HTMLElement;

        if (newsDoc !== null) {
            newsDoc.innerHTML = '';
            newsDoc.appendChild(fragment);
        }
    }
}
export default News;

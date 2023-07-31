import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: Function): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: Function) {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        while (target !== newsContainer) {
            let iElement = target as Element;
            let iContainer = newsContainer as Element;

            if (iElement.classList.contains('source__item')) {
                const sourceId: string | null = iElement.getAttribute('data-source-id');
                if (sourceId !== null && iContainer.getAttribute('data-source') !== sourceId) {
                    iContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            if (iElement.parentNode) {
                target = iElement.parentNode;
            }
        }
    }
}

export default AppController;

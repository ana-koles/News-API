import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { CallbackSources, CallbackNews } from '../controller/loader';

interface InApp {
    start: () => void;
}

class App implements InApp {
    public readonly controller: AppController;
    public readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources: HTMLElement | null = document.querySelector('.sources');
        sources?.addEventListener('click', (e) => this.controller.getNews(e, new CallbackNews( ).getFunction( this.view )));
        this.controller.getSources( new CallbackSources( ).getFunction( this.view ) );
    }
}

export default App;

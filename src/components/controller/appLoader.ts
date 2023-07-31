import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '09d0d1025e9c4b7d8f43b2b1539f71f7',
        });
    }
}

export default AppLoader;

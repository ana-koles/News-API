import './sources.css';
import {SourceDetails} from '../appView';

interface Sourses {
    draw(data: SourceDetails[]): void;
}

class Sources implements Sourses {
    draw(data: SourceDetails[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp !== null) {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as ParentNode | null;

                if (sourceClone !== null) {
                    let sourceItemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
                    sourceItemName.textContent = item.name;
                    
                    let sourceItem = sourceClone.querySelector('.source__item') as HTMLElement;
                    sourceItem.setAttribute('data-source-id', item.id);
                    fragment.append(sourceClone);
                }
            }
        });
        let sources = document.querySelector('.sources') as HTMLElement;
        if (sources !== null) {
            sources.append(fragment);
        }
    }
}

export default Sources;

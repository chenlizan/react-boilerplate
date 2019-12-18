import {fabric} from 'fabric';


export interface DiagramProps {
    x?: number,
    y?: number
}

export default class Diagram<P = {}> {

    constructor(props?: Readonly<P>) {
    }


    generate(): fabric.Object[] {
        throw new Error('generate method is not implemented');
    }
}
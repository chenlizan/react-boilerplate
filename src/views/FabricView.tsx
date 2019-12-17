import * as React from 'react';
import {fabric} from 'fabric';
import Ruler from '../components/ruler';

export default class FabricView extends React.Component {

    componentDidMount() {
        let canvas = new fabric.Canvas('canvas');

        canvas.setWidth(1024);
        canvas.setHeight(768);

        const ruler1 = new Ruler();
        // ruler1.setOffset(8);
        ruler1.setScale(88);

        canvas.add(...ruler1.generate());
    }


    render() {
        return (
            <canvas id='canvas'/>
        )
    }
}


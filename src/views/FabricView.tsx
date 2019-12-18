import * as React from 'react';
import {fabric} from 'fabric';
import Frame from '../components/Frame';
import Ruler from '../components/Ruler';

const LINE_HEIGHT = 40;

export default class FabricView extends React.Component {

    componentDidMount() {
        let canvas = new fabric.Canvas('canvas');

        canvas.setWidth(1024);
        canvas.setHeight(768);

        const frame = new Frame({x: 5, y: 5, width: 1024, height: 768});
        const ruler1 = new Ruler();
        const ruler2 = new Ruler();

        ruler1.setScale(120);
        ruler2.setScale(150);

        frame.setRuler(ruler1,'top');
        frame.setRuler(ruler2,'bottom');


        canvas.add(...ruler1.generate());
        canvas.add(...ruler2.generate());
        canvas.add(...frame.generate());
    }


    render() {
        return (
            <canvas id='canvas'/>
        )
    }
}


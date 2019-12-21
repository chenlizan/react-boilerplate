import * as React from 'react';
import {fabric} from 'fabric';
import Frame from '../components/Frame';
import Ruler from '../components/Ruler';
import MonthCell from '../components/MonthCell';
import CycleCell from '../components/CycleCell';

const LINE_HEIGHT = 40;

export default class FabricView extends React.Component {

    componentDidMount() {
        let canvas = new fabric.Canvas('canvas');

        canvas.setWidth(2024);
        canvas.setHeight(768);

        const frame = new Frame({width: 820, height: 600});
        const ruler1 = new Ruler();
        const ruler2 = new Ruler();
        const monthCell = new MonthCell();
        const cycleCell = new CycleCell();

        frame.setOffset(10);

        monthCell.setStartTime(new Date("2019-03-15"));

        cycleCell.setCycle(2);

        // frame.setWidth(500);
        // frame.setScale(200);

        frame.setRuler(ruler1, 'top');
        frame.setRuler(ruler2, 'bottom');
        frame.setMonthCell(monthCell);
        frame.setCycleCell(cycleCell);


        canvas.add(...ruler1.generate());
        canvas.add(...ruler2.generate());
        canvas.add(...monthCell.generate());
        canvas.add(...cycleCell.generate());
        canvas.add(...frame.generate());


        setTimeout(function () {
            ruler2.setScale(150);
            canvas.renderAll();
        }, 5000)
    }


    render() {
        return (
            <canvas id='canvas'/>
        )
    }
}


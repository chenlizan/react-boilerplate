import * as React from 'react';
import Frame from '../components/Frame';

export default class FabricView extends React.Component {

    componentDidMount() {
        const frame = new Frame();
        frame.init();


        setTimeout(function () {
            frame.setWidth(1024);
            frame.reDraw()
        }, 3000);

    }

    render() {
        return (
            <canvas id='canvas'/>
        )
    }
}


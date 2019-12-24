import * as React from 'react';
import {Input} from 'antd';
import Frame from '../components/Frame';

const {Search} = Input;

export default class FabricView extends React.Component {
    private frame!: Frame;

    constructor(props: any) {
        super(props);

    }

    componentDidMount() {
        this.frame = new Frame();
        this.frame.init();
    }

    handleFun = (type: string, value: string) => {
        switch (type) {
            case 'day':
                this.frame.setDay(Number(value));
                break;
            case 'width':
                this.frame.setWidth(Number(value));
                break;
            case 'height':
                this.frame.setHeight(Number(value));
                break;
            case 'weekCycle':
                this.frame.setWeekCycle(Number(value));
                break;
            case 'scale':
                this.frame.setScale(Number(value));
                break;
            case 'offset':
                this.frame.setOffset(Number(value));
                break;
        }
        this.frame.reDraw();
    };

    render() {
        return (
            <div style={{width: 1920}}>
                <h2>请输入一个正整数，宽度和工程总周期是互相制约关系</h2>
                <Search
                    style={{width: 160, marginRight: 5}}
                    defaultValue="800"
                    enterButton="设置宽度"
                    size="large"
                    onSearch={this.handleFun.bind(null, 'width')}
                />
                <Search
                    style={{width: 160, marginRight: 5}}
                    defaultValue="600"
                    enterButton="设置高度"
                    size="large"
                    onSearch={this.handleFun.bind(null, 'height')}
                />
                <Search
                    style={{width: 210, marginRight: 5}}
                    defaultValue="5"
                    enterButton="设置标尺间隙宽度"
                    size="large"
                    onSearch={this.handleFun.bind(null, 'offset')}
                />
                <Search
                    style={{width: 180, marginRight: 5}}
                    defaultValue="2"
                    enterButton="设置工程周"
                    size="large"
                    onSearch={this.handleFun.bind(null, "weekCycle")}
                />
                <Search
                    style={{width: 180, marginRight: 5}}
                    defaultValue="6"
                    enterButton="设置间距天数"
                    size="large"
                    onSearch={this.handleFun.bind(null, "day")}
                />
                <Search
                    style={{width: 200, marginRight: 5}}
                    defaultValue="140"
                    enterButton="设置工程总周期"
                    size="large"
                    onSearch={this.handleFun.bind(null, 'scale')}
                />
                <canvas id='canvas'/>
            </div>
        )
    }
}


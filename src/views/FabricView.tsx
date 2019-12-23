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

    handleFun = (value:string) =>{
        this.frame.setDay(Number(value));
        this.frame.reDraw();
    };

    render() {
        return (
            <div>
                <canvas id='canvas'/>
                <Search
                    defaultValue="6"
                    placeholder="请输入一个正整数"
                    enterButton="设置间距天数"
                    size="large"
                    onSearch={this.handleFun}
                />
            </div>
        )
    }
}


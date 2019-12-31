import {fabric} from 'fabric';
import Diagram, {DiagramProps} from '../Diagram';
import {TaskDataProps} from './TaskObject';
import {getDiff, getTaskInfo, getTurnPoints} from '../Utils';
import * as moment from "moment";


interface TurnPointProps extends DiagramProps {
    data: Array<TaskDataProps>
}

export default class TurnPoint extends Diagram<TurnPointProps> {

    private readonly _object: fabric.Object[] = [];
    private _data: Array<TaskDataProps> = [];

    constructor(props?: Readonly<TurnPointProps>) {
        super(props);
        this._data = props && props.data ? props.data : this._data;
    }

    getData(): Array<TaskDataProps> {
        return this._data;
    }

    setData(value: Array<TaskDataProps>): void {
        this._data = value;
    }

    generate(): fabric.Object[] {
        const turnPointsArr = getTurnPoints(this.getData());
        for (let i = 0; i < turnPointsArr.length; i++) {
            let like = 1;
            for (let j = 0; j < this.getData().length; j++) {
                const diff = moment(turnPointsArr[i]).diff(this.getData()[j].startDate, 'days');
                if (diff === 0) {
                    const preTaskInfo = <TaskDataProps>getTaskInfo(this.getData(), {taskNo: (this.getData()[j].preTask as Array<number>)[0]});
                    if (preTaskInfo && preTaskInfo.top && like === 1) {
                        this.getData()[j].top = preTaskInfo.top;
                    } else {
                        this.getData()[j].top = 100 * like;
                    }
                    like++;
                }
            }
        }
        for (let i = 0; i < turnPointsArr.length; i++) {
            const startDate = <TaskDataProps>getTaskInfo(this.getData(), {startDate: moment(turnPointsArr[i]).format("YYYY-M-D")});
            const endDate = <TaskDataProps>getTaskInfo(this.getData(), {endDate: moment(turnPointsArr[i]).subtract(1, 'days').format("YYYY-M-D")});
            const topValue = startDate ? startDate.top : endDate.top;
            this._object.push(
                new fabric.Circle({
                    left: 100 - this.getOffset() + getDiff(turnPointsArr[0], turnPointsArr[i]) * this.getOffset(),
                    top: this.getLineHeight() * 3 + <number>topValue,
                    // strokeWidth: 1,
                    radius: this.getOffset(),
                    fill: 'white',
                    stroke: 'red',
                    hasControls: false,
                    hasBorders: false
                })
            );
            if (i !== 0) {
                this._object.push(
                    new fabric.Triangle({
                        width: this.getOffset() * 2,
                        height: this.getOffset(),
                        fill: 'red',
                        angle: 90,
                        left: 100 - this.getOffset() + getDiff(turnPointsArr[0], turnPointsArr[i]) * this.getOffset() + 1,
                        top: this.getLineHeight() * 3 + <number>topValue + 1,
                    })
                );
            }

        }

        return this._object;
    }

}
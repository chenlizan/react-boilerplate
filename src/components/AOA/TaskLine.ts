import {fabric} from 'fabric';
import Diagram, {DiagramProps} from '../Diagram';
import {TaskDataProps} from "./TaskObject";
import {getDiff, getTaskInfo, getTurnPoints} from '../Utils';
import * as moment from "moment";


interface TaskLineProps extends DiagramProps {
    data: Array<TaskDataProps>
}


export default class TaskLine extends Diagram<TaskLineProps> {

    private readonly _object: fabric.Object[] = [];
    private _data: Array<TaskDataProps> = [];

    constructor(props?: Readonly<TaskLineProps>) {
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
        for (let i = 0; i < this.getData().length; i++) {
            const preTaskInfo = <TaskDataProps>getTaskInfo(this.getData(), {taskNo: (this.getData()[i].preTask as Array<number>)[0]});
            this._object.push(
                new fabric.Line(
                    [
                        100 + getDiff(turnPointsArr[0], <Date>this.getData()[i].startDate) * this.getOffset(),
                        this.getLineHeight() * 3 + this.getOffset() + <number>this.getData()[i].top,
                        100 + getDiff(turnPointsArr[0], <Date>this.getData()[i].endDate) * this.getOffset(),
                        this.getLineHeight() * 3 + this.getOffset() + <number>this.getData()[i].top,
                    ], {
                        selectable: false,
                        stroke: 'red',
                        strokeWidth: 3
                    }
                )
            );
            if (preTaskInfo && preTaskInfo.top !== this.getData()[i].top) {
                this._object.push(
                    new fabric.Line(
                        [
                            100 + getDiff(turnPointsArr[0], <Date>this.getData()[i].startDate) * this.getOffset(),
                            this.getLineHeight() * 3 + this.getOffset() + <number>preTaskInfo.top,
                            100 + getDiff(turnPointsArr[0], <Date>this.getData()[i].startDate) * this.getOffset(),
                            this.getLineHeight() * 3 + this.getOffset() + <number>this.getData()[i].top,
                        ], {
                            selectable: false,
                            stroke: 'red',
                            strokeWidth: 3
                        }
                    )
                )
            }
        }
        return this._object
    }

}
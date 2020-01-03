import {fabric} from 'fabric';
import Diagram, {DiagramProps} from '../Diagram';
import {TaskDataProps} from "./TaskObject";
import {getDiff, getTaskInfo, getTurnPoints} from '../Utils';
import * as moment from "moment";


interface TaskLineProps extends DiagramProps {
    data: Array<TaskDataProps>
}

export default class TaskLine extends Diagram<TaskLineProps> {

    private static readonly FIRSTLINETOP: number = 100;
    private static readonly FONTSIZE: number = 12;

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

    getInterval(width: number): number {
        const interval = Math.floor((width - this.getOffset() * 2) / TaskLine.FONTSIZE);
        return interval ? interval : 1;
    }

    textFormatTaskName(text: string, curTaskInfo: TaskDataProps): string {
        const width = getDiff(<Date>curTaskInfo.startDate, <Date>curTaskInfo.endDate) * this.getOffset();
        const textWidth = text.length * TaskLine.FONTSIZE;
        const interval = this.getInterval(width);
        if (textWidth > width - this.getOffset() * 2) {
            const formatText = text.split('').map((item, index) => {
                if ((index + 1) % interval === 0) {
                    return item + '\n';
                } else {
                    return item;
                }
            });
            return formatText.join('');
        }
        return text;
    }

    textStyleTaskName(text: string, curTaskInfo: TaskDataProps): object {
        const width = getDiff(<Date>curTaskInfo.startDate, <Date>curTaskInfo.endDate) * this.getOffset();
        const interval = this.getInterval(width);
        const line = Math.ceil(text.length / interval) + 1.5;
        const padding = (width - (interval > text.length ? text.length : interval) * TaskLine.FONTSIZE) / 2;
        return {
            top: this.getLineHeight() * 3 + this.getOffset() + <number>curTaskInfo.top - TaskLine.FONTSIZE * line,
            left: this.getX() + getDiff(this.getStartTime(), <Date>curTaskInfo.startDate) * this.getOffset() + padding,
            fontSize: TaskLine.FONTSIZE,
            shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
            selectable: false
        };
    }

    textFormatDay(curTaskInfo: TaskDataProps): string {
        const day = getDiff(<Date>curTaskInfo.startDate, <Date>curTaskInfo.endDate);
        return day + 1 + '天';
    }

    textStyleDay(curTaskInfo: TaskDataProps): object {
        const width = getDiff(<Date>curTaskInfo.startDate, <Date>curTaskInfo.endDate) * this.getOffset();
        const text = this.textFormatDay(curTaskInfo);
        const line = TaskLine.FONTSIZE + 1.5;
        const padding = (width - text.length * TaskLine.FONTSIZE) / 2;
        return {
            top: this.getLineHeight() * 3 + this.getOffset() + <number>curTaskInfo.top + line,
            left: this.getX() + getDiff(this.getStartTime(), <Date>curTaskInfo.startDate) * this.getOffset() + padding,
            fontSize: TaskLine.FONTSIZE,
            shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
            selectable: false
        }
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
                        this.getData()[j].top = TaskLine.FIRSTLINETOP * like;
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
                        this.getX() + getDiff(this.getStartTime(), <Date>this.getData()[i].startDate) * this.getOffset(),
                        this.getLineHeight() * 3 + this.getOffset() + <number>this.getData()[i].top,
                        this.getX() + getDiff(this.getStartTime(), <Date>this.getData()[i].endDate) * this.getOffset(),
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
                            this.getX() + getDiff(this.getStartTime(), <Date>this.getData()[i].startDate) * this.getOffset(),
                            this.getLineHeight() * 3 + this.getOffset() + <number>preTaskInfo.top,
                            this.getX() + getDiff(this.getStartTime(), <Date>this.getData()[i].startDate) * this.getOffset(),
                            this.getLineHeight() * 3 + this.getOffset() + <number>this.getData()[i].top,
                        ], {
                            selectable: false,
                            stroke: 'red',
                            strokeWidth: 3
                        }
                    )
                )
            }
            this._object.push(
                new fabric.Text(
                    this.textFormatTaskName(this.getData()[i].taskName, this.getData()[i]),
                    this.textStyleTaskName(this.getData()[i].taskName, this.getData()[i])
                )
            );
            this._object.push(
                new fabric.Text(
                    this.textFormatDay(this.getData()[i]),
                    this.textStyleDay(this.getData()[i])
                )
            )
        }
        return this._object
    }

}

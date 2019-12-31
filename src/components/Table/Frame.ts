import {fabric} from 'fabric';
import Diagram, {DiagramProps} from '../Diagram';
import CycleCell from './CycleCell';
import DayCell from './DayCell';
import MonthCell from './MonthCell';
import Ruler from './Ruler';
import Task from '../AOA/Task';


interface FrameProps extends DiagramProps {
    width: number,
    height: number
}

export default class Frame extends Diagram<FrameProps> {

    private static readonly TABLETITLE: string[] = ['工程标尺', '月', '日', '进度标尺', '星期', '工程周'];
    private static readonly TABLELEFTWIDTH: number = 100;
    private static readonly TABLEBORDERWIDTH: number = 2;

    private readonly CANVAS: fabric.Canvas = new fabric.Canvas('canvas');
    private readonly _object: fabric.Object[] = [];
    private _width: number = 800;
    private _height: number = 600;
    private _day: number = 6;
    private _startTime: Date = new Date();
    private _weekCycle: number = 2;
    private _data: Array<any> = [];

    private _cycleCell: any | undefined;
    private _dayCell: any | undefined;
    private _monthCell: any | undefined;
    private _rulerTopCell: any | undefined;
    private _rulerBottomCell: any | undefined;
    private _taskCell: any | undefined;

    constructor(props?: Readonly<FrameProps>) {
        super(props);
        if (props && props.width) {
            this.setWidth(props.width);
            this._width = this.getWidth();
            this.CANVAS.setWidth(this.getWidth() + Frame.TABLEBORDERWIDTH);
        } else {
            this.setWidth(this._width);
            this.CANVAS.setWidth(this.getWidth() + Frame.TABLEBORDERWIDTH);
        }
        if (props && props.height) {
            this.setHeight(props.height);
            this._height = this.getHeight();
            this.CANVAS.setHeight(this.getHeight());
        } else {
            this.setHeight(this._height);
            this.CANVAS.setHeight(this.getHeight());
        }
    }

    init(): void {
        this._cycleCell = new CycleCell();
        this._dayCell = new DayCell();
        this._monthCell = new MonthCell();
        this._rulerTopCell = new Ruler();
        this._rulerBottomCell = new Ruler();
        this._taskCell = new Task({data: this.getData()});
        this.setCycleCell(this._cycleCell);
        this.setDayCell(this._dayCell);
        this.setMonthCell(this._monthCell);
        this.setRuler(this._rulerTopCell, 'top');
        this.setRuler(this._rulerBottomCell, 'bottom');
        this.setTask(this._taskCell);
        this.CANVAS.add(...this._cycleCell.generate());
        this.CANVAS.add(...this._dayCell.generate());
        this.CANVAS.add(...this._monthCell.generate());
        this.CANVAS.add(...this._rulerTopCell.generate());
        this.CANVAS.add(...this._rulerBottomCell.generate());
        this.CANVAS.add(...this._taskCell.generate());
        this.CANVAS.add(...this.generate());
    }

    reDraw(): void {
        this._object.length = 0;
        this.CANVAS.remove(...this.CANVAS.getObjects());
        this.CANVAS.setWidth(this.getWidth() + Frame.TABLEBORDERWIDTH);
        this.CANVAS.setHeight(this.getHeight());
        this.init();
    }

    getWidth(): number {
        return Frame.TABLELEFTWIDTH + this.getScale() * this.getOffset();
    }

    setWidth(value: number): void {
        this.setScale((value - Frame.TABLELEFTWIDTH) / this.getOffset());
        this._width = this.getWidth();
    }

    getHeight(): number {
        return this._height;
    }

    setHeight(value: number): void {
        this._height = value;
    }

    getDay(): number {
        return this._day;
    }

    setDay(value: number) {
        this._day = value;
    }

    getStartTime(): Date {
        return this._startTime;
    }

    setStartTime(value: Date) {
        this._startTime = value;
    }

    getWeekCycle(): number {
        return this._weekCycle;
    }

    setWeekCycle(value: number): void {
        this._weekCycle = value;
    }

    getData(): Array<any> {
        return this._data;
    }

    setData(value: Array<any>) {
        this._data = value;
    }

    private setCycleCell(cycleCell: any): void {
        cycleCell.setCycle(this.getWeekCycle());
        cycleCell.setLineHeight(this.getLineHeight());
        cycleCell.setOffset(this.getOffset());
        cycleCell.setScale(this.getScale());
        cycleCell.setX(Frame.TABLELEFTWIDTH + this.getX());
        cycleCell.setY(this.getHeight() - this.getY() - this.getLineHeight());
    }

    private setDayCell(dayCell: any): void {
        dayCell.setDay(this.getDay());
        dayCell.setLineHeight(this.getLineHeight());
        dayCell.setOffset(this.getOffset());
        dayCell.setScale(this.getScale());
        dayCell.setStartTime(this.getStartTime());
        dayCell.setX(Frame.TABLELEFTWIDTH + this.getX());
        dayCell.setY(this.getY() + this.getLineHeight() * 2);
    }

    private setMonthCell(monthCell: any): void {
        monthCell.setLineHeight(this.getLineHeight());
        monthCell.setOffset(this.getOffset());
        monthCell.setScale(this.getScale());
        monthCell.setStartTime(this.getStartTime());
        monthCell.setX(Frame.TABLELEFTWIDTH + this.getX());
        monthCell.setY(this.getY() + this.getLineHeight());
    }

    private setRuler(ruler: any, position: 'top' | 'bottom'): void {
        ruler.setLineHeight(this.getLineHeight());
        ruler.setOffset(this.getOffset());
        ruler.setScale(this.getScale());
        ruler.setX(Frame.TABLELEFTWIDTH + this.getX());
        position === 'top'
            ? ruler.setY(this.getY())
            : ruler.setY(this.getHeight() - this.getY() - this.getLineHeight() * 3);
    }

    private setTask(task: any): void {
        task.setLineHeight(this.getLineHeight());
        task.setOffset(this.getOffset());
        task.setScale(this.getScale());
        task.setX(Frame.TABLELEFTWIDTH + this.getX());
        task.setY(this.getHeight() - this.getY() - this.getLineHeight());
        task.setData(this.getData());
    }

    private textStyle(text: string, index: number): object {
        return {
            selectable: false,
            fontSize: this.getFontSize(),
            fontWeight: 'bold',
            shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
            top: index > 3 ? (this.getHeight() - this.getY() - this.getLineHeight() * 3) + this.getLineHeight() * (index - 4) + ((this.getLineHeight() - this.getFontSize()) / 2)
                : this.getY() + this.getLineHeight() * (index - 1) + ((this.getLineHeight() - this.getFontSize()) / 2),
            left: this.getX() + (Frame.TABLELEFTWIDTH - (this.getFontSize()) * text.length) / 2
        }
    }

    generate(): fabric.Object[] {
        for (let i = 1; i <= 4; i++) {
            this._object.push(
                new fabric.Line(
                    [
                        this.getX(),
                        this.getY() + this.getLineHeight() * (i - 1),
                        this.getWidth() - this.getX() + Frame.TABLEBORDERWIDTH,
                        this.getY() + this.getLineHeight() * (i - 1)
                    ],
                    {
                        selectable: false,
                        stroke: this.getColor(),
                        strokeWidth: 1,
                    }
                )
            );
            this._object.push(
                new fabric.Line(
                    [
                        this.getX(),
                        (this.getHeight() - this.getY() - this.getLineHeight() * 3) + this.getLineHeight() * (i - 1),
                        this.getWidth() - this.getX() + Frame.TABLEBORDERWIDTH,
                        (this.getHeight() - this.getY() - this.getLineHeight() * 3) + this.getLineHeight() * (i - 1)
                    ],
                    {
                        selectable: false,
                        stroke: this.getColor(),
                        strokeWidth: 1,
                    }
                )
            );
        }

        this._object.push(
            new fabric.Line(
                [
                    this.getX(),
                    this.getY(),
                    this.getX(),
                    this.getHeight() - this.getY()
                ],
                {
                    selectable: false,
                    stroke: this.getColor(),
                    strokeWidth: 1,
                }
            )
        );

        this._object.push(
            new fabric.Line(
                [
                    Frame.TABLELEFTWIDTH + this.getX(),
                    this.getY(),
                    Frame.TABLELEFTWIDTH + this.getX(),
                    this.getHeight() - this.getY()
                ],
                {
                    selectable: false,
                    stroke: this.getColor(),
                    strokeWidth: 1,
                }
            )
        );

        this._object.push(
            new fabric.Line(
                [
                    this.getWidth() - this.getX() + Frame.TABLEBORDERWIDTH,
                    this.getY(),
                    this.getWidth() - this.getX() + Frame.TABLEBORDERWIDTH,
                    this.getHeight() - this.getY()
                ],
                {
                    selectable: false,
                    stroke: this.getColor(),
                    strokeWidth: 1,
                }
            )
        );

        for (let i = 1; i <= Frame.TABLETITLE.length; i++) {
            this._object.push(
                new fabric.Text(Frame.TABLETITLE[i - 1], this.textStyle(Frame.TABLETITLE[i - 1], i))
            );
        }

        return this._object;
    }

}

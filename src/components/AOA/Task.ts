import {fabric} from "fabric";
import Diagram, {DiagramProps} from '../Diagram';
import {TaskDataProps} from './TaskObject';
import TurnPoint from './TurnPoint';
import TurnLine from './TaskLine';


interface TaskProps extends DiagramProps {
    data: Array<TaskDataProps>
}

export default class Task extends Diagram<TaskProps> {

    private _data: Array<TaskDataProps> = [];

    private _turnPoint: any | undefined;
    private _turnLine: any | undefined;

    constructor(props?: Readonly<TaskProps>) {
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
        this._turnPoint = new TurnPoint();
        this._turnPoint.setLineHeight(this.getLineHeight());
        this._turnPoint.setOffset(this.getOffset());
        this._turnPoint.setScale(this.getScale());
        this._turnPoint.setX(this.getX());
        this._turnPoint.setY(this.getY());
        this._turnPoint.setData(this.getData());
        this._turnLine = new TurnLine();
        this._turnLine.setLineHeight(this.getLineHeight());
        this._turnLine.setOffset(this.getOffset());
        this._turnLine.setScale(this.getScale());
        this._turnLine.setX(this.getX());
        this._turnLine.setY(this.getY());
        this._turnLine.setData(this.getData());
        return [...this._turnLine.generate(), ...this._turnPoint.generate()];
    }
}
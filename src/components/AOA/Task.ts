import {fabric} from "fabric";
import Diagram, {DiagramProps} from '../Diagram';
import {TaskDataProps} from './TaskObject';
import TurnPoint from './TurnPoint';
import TurnLine from './TaskLine';


export interface TaskProps extends DiagramProps {
    data: Array<TaskDataProps>
}

export default class Task extends Diagram<TaskProps> {

    private readonly _object: fabric.Object[] = [];
    private _data: Array<TaskDataProps> = [];

    private _turnPoint: any | undefined;
    private _turnLine: any | undefined;

    constructor(props?: Readonly<TaskProps>) {
        super(props);
        if (props && props.data) {
            this.setData(props.data);
        }
    }

    getData(): Array<TaskDataProps> {
        return this._data;
    }

    setData(value: Array<TaskDataProps>): void {
        this._data = value;
        this._turnPoint = new TurnPoint({data: value});
        this._turnLine = new TurnLine({data: value});
    }

    generate(): fabric.Object[] {
        return [...this._turnLine.generate(), ...this._turnPoint.generate()];
    }
}
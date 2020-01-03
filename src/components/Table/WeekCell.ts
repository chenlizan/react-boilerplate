import {fabric} from 'fabric';
import Diagram, {DiagramProps} from '../Diagram';


interface WeekCellProps extends DiagramProps {
    height: number
}

export default class WeekCell extends Diagram<WeekCellProps> {

    private readonly _object: fabric.Object[] = [];
    private _height: number = 600;

    constructor(props?: Readonly<WeekCellProps>) {
        super(props);
        this._height = props && props.height ? props.height : this._height;
    }

    getHeight(): number {
        return this._height;
    }

    setHeight(value: number): void {
        this._height = value;
    }

    calcWeekend(date: Date, days: number): number {
        const startDate = new Date(date);
        startDate.setDate(startDate.getDate() + days);
        return startDate.getDay();
    }

    generate(): fabric.Object[] {

        for (let i = 0; i <= this.getScale(); i++) {

            const week = this.calcWeekend(this.getStartTime(), i);
            if (week === 6 || week === 0) {
                this._object.push(
                    new fabric.Line(
                        [
                            this.getX() + this.getOffset() * i,
                            this.getY(),
                            this.getX() + this.getOffset() * i,
                            this.getY() + this.getHeight() - this.getLineHeight() * 5
                        ], {
                            selectable: false,
                            opacity: 0.2,
                            stroke: 'gray',
                            strokeWidth: this.getOffset()
                        }
                    )
                );
            }


        }

        return this._object;
    }
}
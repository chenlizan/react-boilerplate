import {fabric} from 'fabric';
import Diagram, {DiagramProps} from '../Diagram';

interface DayCellProps extends DiagramProps {
    day?: number,
    height: number
}

export default class DayCell extends Diagram<DayCellProps> {

    private readonly _object: fabric.Object[] = [];
    private _day: number = 6;
    private _height: number = 600;

    constructor(props?: Readonly<DayCellProps>) {
        super(props);
        this._day = props && props.day ? props.day : this._day;
        this._height = props && props.height ? props.height : this._height;
    }

    getDay(): number {
        return this._day;
    }

    setDay(value: number): void {
        this._day = value;
    }

    getHeight(): number {
        return this._height;
    }

    setHeight(value: number): void {
        this._height = value;
    }

    textStyle(text: string, scale: number): object {
        return {
            top: this.getY() + (this.getLineHeight() - this.getFontSize()) / 2,
            left: this.getX() + this.getOffset() * (scale - this.getDay()) + (this.getDay() * this.getOffset() - this.getFontSize() / 2 * text.length) / 2,
            fontSize: this.getFontSize(),
            opacity: this.getFontSize() / 2 * text.length < this.getDay() * this.getOffset() ? 1 : 0,
            shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
            selectable: false,
        }
    }

    calcCycleDay(date: Date, days: number): number {
        const startDate = new Date(date);
        startDate.setDate(startDate.getDate() + days);
        return startDate.getDate();
    }

    generate(): fabric.Object[] {
        for (let i = 0; i <= this.getScale(); i += this.getDay()) {
            if (i !== 0) {
                const currentCycleDay = this.calcCycleDay(this.getStartTime(), i).toString();
                this._object.push(
                    new fabric.Text(currentCycleDay, this.textStyle(currentCycleDay, i))
                );
                this._object.push(
                    new fabric.Line(
                        [
                            this.getX() + this.getOffset() * i,
                            this.getY(),
                            this.getX() + this.getOffset() * i,
                            this.getY() + this.getLineHeight()
                        ], {
                            selectable: false,
                            stroke: this.getColor(),
                            strokeWidth: 1,
                        }
                    )
                );
                this._object.push(
                    new fabric.Line(
                        [
                            this.getX() + this.getOffset() * i,
                            this.getY() + this.getLineHeight(),
                            this.getX() + this.getOffset() * i,
                            this.getY() + this.getHeight() - this.getLineHeight() * 4
                        ], {
                            selectable: false,
                            stroke: this.getColor(),
                            strokeWidth: 1,
                            strokeDashArray: [3, 3]
                        }
                    )
                );
            }

        }
        return this._object;
    }
}

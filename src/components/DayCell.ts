import {fabric} from 'fabric';
import Diagram, {DiagramProps} from './Diagram';

interface DayCellProps extends DiagramProps {

}

export default class DayCell extends Diagram<DayCellProps> {

    private readonly _object: fabric.Object[] = [];
    private _day: number = 5;
    private _startTime: Date = new Date();

    constructor(props?: Readonly<DayCellProps>) {
        super(props);
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

    textStyle(text: string, scale: number): Object {
        return {
            selectable: false,
            fontSize: this.getFontSize(),
            shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
            top: this.getY() + (this.getLineHeight() - this.getFontSize()) / 2,
            left: this.getX() + this.getOffset() * (scale - this.getDay()) + (this.getDay() * this.getOffset() - this.getFontSize() / 2 * text.length) / 2,
            opacity: this.getFontSize() / 2 * text.length < this.getDay() * this.getOffset() ? 1 : 0
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
                            strokeWidth: 1
                        }
                    )
                );

            }

        }
        return this._object;
    }
}
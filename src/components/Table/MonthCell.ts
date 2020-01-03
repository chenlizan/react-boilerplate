import {fabric} from 'fabric';
import Diagram, {DiagramProps} from '../Diagram';

interface MonthCellProps extends DiagramProps {
}

export default class MonthCell extends Diagram<MonthCellProps> {

    private readonly _object: fabric.Object[] = [];

    constructor(props?: Readonly<MonthCellProps>) {
        super(props);
    }

    static calcMonthDay(year: number, month: number): number {
        return new Date(year, month + 1, 0).getDate();
    }

    textStyle(text: string, preScale: number, scale: number): object {
        return {
            top: this.getY() + ((this.getLineHeight() - this.getFontSize()) / 2),
            left: this.getX() + this.getOffset() * preScale
                + ((scale - preScale) * this.getOffset() - (this.getFontSize() / 2) * (text.length - 0.5)) / 2,
            fontSize: this.getFontSize(),
            fontWeight: 'bold',
            opacity: this.getFontSize() / 2 * text.length < (scale - preScale) * this.getOffset() ? 1 : 0,
            shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
            selectable: false,
        }
    }

    generate(): fabric.Object[] {
        const startYear = this.getStartTime().getFullYear();
        const startMonth = this.getStartTime().getMonth();
        const startDay = this.getStartTime().getDate();

        let year = startYear;
        let month = startMonth;
        let day = MonthCell.calcMonthDay(startYear, startMonth) - startDay + 1;
        let preScale = 1;

        for (let i = 0; i <= this.getScale(); i++) {
            if (i === day) {
                this._object.push(
                    new fabric.Text(year + '.' + (month + 1), this.textStyle(year + '.' + (month + 1), preScale, i))
                );
                this._object.push(
                    new fabric.Line(
                        [
                            this.getX() + this.getOffset() * day,
                            this.getY(),
                            this.getX() + this.getOffset() * day,
                            this.getY() + this.getLineHeight()
                        ], {
                            selectable: false,
                            stroke: this.getColor(),
                            strokeWidth: 1
                        }
                    )
                );
                day += MonthCell.calcMonthDay(year, month);
                preScale = i;
                month++;
                if (month > 11) {
                    year++;
                    month = 0
                }
            }
        }

        return this._object
    }

}

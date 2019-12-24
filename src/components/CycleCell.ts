import {fabric} from 'fabric';
import Diagram, {DiagramProps} from './Diagram';

interface CycleCellProps extends DiagramProps {
    cycle?: number
}

export default class CycleCell extends Diagram<CycleCellProps> {

    private static readonly WEEK: number = 7;

    private readonly _object: fabric.Object[] = [];
    private _cycle: number = 7;

    constructor(props?: Readonly<CycleCellProps>) {
        super(props);
        this._cycle = props && props.cycle ? props.cycle : this._cycle;
    }

    getCycle(): number {
        return this._cycle;
    }

    setCycle(value: number): void {
        this._cycle = CycleCell.WEEK * value;
    }

    textStyle(text: string, scale: number): object {
        return {
            selectable: false,
            fontSize: this.getFontSize(),
            shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
            top: this.getY() + (this.getLineHeight() - this.getFontSize()) / 2,
            left: this.getX() + this.getOffset() * (scale - this.getCycle()) + (this.getCycle() * this.getOffset() - this.getFontSize() / 2 * text.length) / 2,
            opacity: this.getFontSize() / 2 * text.length < this.getCycle() * this.getOffset() ? 1 : 0
        }
    }

    generate(): fabric.Object[] {
        for (let i = 0; i <= this.getScale(); i += this.getCycle()) {
            if (i !== 0) {
                this._object.push(
                    new fabric.Text(String(i / CycleCell.WEEK), this.textStyle((i / CycleCell.WEEK).toString(), i))
                );
            }
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
        return this._object;
    }

}

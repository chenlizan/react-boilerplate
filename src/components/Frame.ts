import {fabric} from 'fabric';
import Diagram, {DiagramProps} from './Diagram';


interface FrameProps extends DiagramProps {
    width: number,
    height: number
}

export default class Frame extends Diagram<FrameProps> {

    private readonly TABLETITLE: string[] = ['工程标尺', '月', '日', '进度标尺', '星期', '工程周'];
    private readonly TABLELEFTWIDTH: number = 100;
    private readonly TABLEBORDERWIDTH: number = 2;

    private readonly _object: fabric.Object[] = [];

    private _width: number = 800;
    private _height: number = 600;

    constructor(props?: Readonly<FrameProps>) {
        super(props);
        if (props && props.width) {
            this.setWidth(props.width);
            this._width = this.getWidth();
        }
        this._height = props && props.height ? props.height : this._height;
    }

    getWidth(): number {
        return this.TABLELEFTWIDTH + this.getScale() * this.getOffset();
    }

    setWidth(value: number) {
        this.setScale((value - this.TABLELEFTWIDTH) / this.getOffset());
    }

    getHeight(): number {
        return this._height;
    }

    setHeight(value: number) {
        this._height = value;
    }

    setCycleCell(cycleCell: any) {
        cycleCell.setLineHeight(this.getLineHeight());
        cycleCell.setOffset(this.getOffset());
        cycleCell.setScale(this.getScale());
        cycleCell.setX(this.TABLELEFTWIDTH + this.getX());
        cycleCell.setY(this.getHeight() - this.getY() - this.getLineHeight());
    }

    setMonthCell(monthCell: any) {
        monthCell.setLineHeight(this.getLineHeight());
        monthCell.setOffset(this.getOffset());
        monthCell.setScale(this.getScale());
        monthCell.setX(this.TABLELEFTWIDTH + this.getX());
        monthCell.setY(this.getY() + this.getLineHeight());
    }

    setRuler(ruler: any, position: 'top' | 'bottom') {
        ruler.setLineHeight(this.getLineHeight());
        ruler.setOffset(this.getOffset());
        ruler.setScale(this.getScale());
        ruler.setX(this.TABLELEFTWIDTH + this.getX());
        position === 'top'
            ? ruler.setY(this.getY())
            : ruler.setY(this.getHeight() - this.getY() - this.getLineHeight() * 3);
    }

    textStyle(text: string, index: number) {
        return {
            selectable: false,
            fontSize: this.getFontSize(),
            fontWeight: 'bold',
            shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
            top: index > 3 ? (this.getHeight() - this.getY() - this.getLineHeight() * 3) + this.getLineHeight() * (index - 4) + ((this.getLineHeight() - this.getFontSize()) / 2)
                : this.getY() + this.getLineHeight() * (index - 1) + ((this.getLineHeight() - this.getFontSize()) / 2),
            left: this.getX() + (this.TABLELEFTWIDTH - (this.getFontSize()) * text.length) / 2
        }
    }

    generate(): fabric.Object[] {
        for (let i = 1; i <= 4; i++) {
            this._object.push(
                new fabric.Line(
                    [
                        this.getX(),
                        this.getY() + this.getLineHeight() * (i - 1),
                        this.getWidth() - this.getX() + this.TABLEBORDERWIDTH,
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
                        this.getWidth() - this.getX() + this.TABLEBORDERWIDTH,
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
                    this.TABLELEFTWIDTH + this.getX(),
                    this.getY(),
                    this.TABLELEFTWIDTH + this.getX(),
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
                    this.getWidth() - this.getX() + this.TABLEBORDERWIDTH,
                    this.getY(),
                    this.getWidth() - this.getX() + this.TABLEBORDERWIDTH,
                    this.getHeight() - this.getY()
                ],
                {
                    selectable: false,
                    stroke: this.getColor(),
                    strokeWidth: 1,
                }
            )
        );

        for (let i = 1; i <= this.TABLETITLE.length; i++) {
            this._object.push(
                new fabric.Text(this.TABLETITLE[i - 1], this.textStyle(this.TABLETITLE[i - 1], i))
            );
        }

        return this._object;
    }

}

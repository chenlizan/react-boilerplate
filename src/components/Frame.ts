import {fabric} from 'fabric';
import Diagram, {DiagramProps} from './Diagram';


interface FrameProps extends DiagramProps {
    width: number,
    height: number
}

export default class Frame extends Diagram<FrameProps> {

    private readonly TABLETITLE: string[] = ['工程标尺', '月', '日', '进度标尺', '星期', '工程周'];

    private readonly _object: fabric.Object[] = [];
    private _x: number = 1;
    private _y: number = 1;
    private _width: number = 800;
    private _height: number = 600;
    private _color: string = 'black';
    private _fontSize: number = 16;
    private _lineHeight: number = 40;

    constructor(props?: Readonly<FrameProps>) {
        super(props);
        this._x = props && props.x ? props.x : this._x;
        this._y = props && props.y ? props.y : this._y;
        this._width = props && props.width ? props.width : this._width;
        this._height = props && props.height ? props.height : this._height;
    }

    getX(): number {
        return this._x;
    }

    setX(value: number) {
        this._x = value;
    }

    getY(): number {
        return this._y;
    }

    setY(value: number) {
        this._y = value;
    }

    getWeight(): number {
        return this._width;
    }

    setWeight(value: number) {
        this._width = value;
    }

    getHeight(): number {
        return this._height;
    }

    setHeight(value: number) {
        this._height = value;
    }

    getColor(): string {
        return this._color;
    }

    setColor(value: string) {
        this._color = value;
    }

    getLineHeight(): number {
        return this._lineHeight;
    }

    setLineHeight(value: number) {
        this._lineHeight = value;
    }

    setRuler(ruler: any, position: 'top' | 'bottom') {
        ruler.setHeight(this._lineHeight);
        ruler.setX(95 + this._x);
        position === 'top'
            ? ruler.setY(this._y)
            : ruler.setY((this._height - this._y - this._lineHeight * 3));
    }

    generate(): fabric.Object[] {

        for (let i = 1; i <= 4; i++) {
            this._object.push(
                new fabric.Line(
                    [
                        this._x,
                        this._y + this._lineHeight * (i - 1),
                        this._width - this._x,
                        this._y + this._lineHeight * (i - 1)
                    ],
                    {
                        selectable: false,
                        stroke: this._color,
                        strokeWidth: 1,
                    }
                )
            );
        }

        for (let i = 1; i <= 4; i++) {
            this._object.push(
                new fabric.Line(
                    [
                        this._x,
                        (this._height - this._y - this._lineHeight * 3) + this._lineHeight * (i - 1),
                        this._width - this._x,
                        (this._height - this._y - this._lineHeight * 3) + this._lineHeight * (i - 1)
                    ],
                    {
                        selectable: false,
                        stroke: this._color,
                        strokeWidth: 1,
                    }
                )
            );


        }

        this._object.push(
            new fabric.Line(
                [
                    this._x,
                    this._y,
                    this._x,
                    this._height - this._y
                ],
                {
                    selectable: false,
                    stroke: this._color,
                    strokeWidth: 1,
                }
            )
        );

        this._object.push(
            new fabric.Line(
                [
                    100 + this._x,
                    this._y,
                    100 + this._x,
                    this._height - this._y
                ],
                {
                    selectable: false,
                    stroke: this._color,
                    strokeWidth: 1,
                }
            )
        );

        this._object.push(
            new fabric.Line(
                [
                    this._width - this._x,
                    this._y,
                    this._width - this._x,
                    this._height - this._y
                ],
                {
                    selectable: false,
                    stroke: this._color,
                    strokeWidth: 1,
                }
            )
        );

        for (let i = 1; i <= 6; i++) {

            this._object.push(
                new fabric.Text(this.TABLETITLE[i - 1], {
                    selectable: false,
                    fontSize: this._fontSize,
                    fontWeight: 'bold',
                    shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
                    top: i > 3 ? (this._height - this._y - this._lineHeight * 3) + this._lineHeight * (i - 4) + ((this._lineHeight - this._fontSize) / 2)
                        : this._y + this._lineHeight * (i - 1) + ((this._lineHeight - this._fontSize) / 2),
                    left: this._x + (100 - (this._lineHeight / 2 - 3) * this.TABLETITLE[i - 1].length) / 2
                })
            );
        }

        return this._object;
    }
}
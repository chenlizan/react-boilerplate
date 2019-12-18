import {fabric} from 'fabric';
import Diagram, {DiagramProps} from './Diagram';


interface RulerProps extends DiagramProps {
    scale?: number
}

export default class Ruler extends Diagram<RulerProps> {

    private readonly _object: fabric.Object[] = [];
    private _x: number = 1;
    private _y: number = 1;
    private _color: string = 'black';
    private _fontSize: number = 16;
    private _height: number = 5;
    private _offset: number = 5;
    private _scale: number = 30;


    constructor(props?: Readonly<RulerProps>) {
        super(props);
        this._x = props && props.x ? props.x : this._x;
        this._y = props && props.y ? props.y : this._y;
    }

    getScale(): number {
        return this._scale;
    }

    setScale(value: number) {
        this._scale = value;
    }

    getHeight(): number {
        return this._height * 8;
    }

    setHeight(value: number) {
        this._height = value / 8;
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

    getOffset(): number {
        return this._offset;
    }

    setOffset(value: number) {
        this._offset = value;
    }

    getColor(): string {
        return this._color;
    }

    setColor(value: string) {
        this._color = value;
    }

    getFontSize(): number {
        return this._fontSize;
    }

    setFontSize(value: number) {
        this._fontSize = value;
    }

    generate(): fabric.Object[] {
        for (let i = 1; i <= this._scale; i++) {
            this._object.push(
                new fabric.Line([this._x + this._offset * i, this._y, this._x + this._offset * i, this._y + this._height], {
                        selectable: false,
                        stroke: this._color,
                        strokeWidth: 1,
                    }
                )
            );
            if (i % 5 === 1 || i === this._scale) {
                this._object.push(
                    new fabric.Line([this._x + this._offset * i, this._y + this._height, this._x + this._offset * i, this._y + this._height * 2], {
                            selectable: false,
                            stroke: this._color,
                            strokeWidth: 1,
                        }
                    )
                );
                if (i % 10 === 1 && i !== 1) {
                    this._object.push(
                        new fabric.Text(String(i - 1), {
                            selectable: false,
                            fontSize: this._fontSize,
                            shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
                            top: this._y + (this._height * 7 - this._fontSize) / 2,
                            left: this._x + this._offset * (i - 1) - (i.toString().length > 1 ? i.toString().length * this._fontSize / 7 : 0)
                        })
                    );
                }
                this._object.push(
                    new fabric.Line([this._x + this._offset * i, this._y + this._height * 6, this._x + this._offset * i, this._y + this._height * 7], {
                            selectable: false,
                            stroke: this._color,
                            strokeWidth: 1,
                        }
                    )
                );
            }
            this._object.push(
                new fabric.Line([this._x + this._offset * i, this._y + this._height * 7, this._x + this._offset * i, this._y + this._height * 8], {
                        selectable: false,
                        stroke: this._color,
                        strokeWidth: 1,
                    }
                )
            );
        }
        return this._object;
    }

}
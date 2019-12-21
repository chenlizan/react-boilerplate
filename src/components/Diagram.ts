import {fabric} from 'fabric';


export interface DiagramProps {
    x?: number,
    y?: number,
    color?: string,
    fontSize?: number,
    lineHeight?: number,
    offset?: number,
    scale?: number
}

export default class Diagram<P> {

    private _x: number = 1;
    private _y: number = 1;
    private _color: string = 'black';
    private _fontSize: number = 16;
    private _lineHeight: number = 40;
    private _offset: number = 5;
    private _scale: number = 30;

    constructor(props?: Readonly<P> | any) {
        this._x = props && props.x ? props.x : this._x;
        this._y = props && props.y ? props.y : this._y;
        this._color = props && props.color ? props.color : this._color;
        this._fontSize = props && props.fontSize ? props.fontSize : this._fontSize;
        this._lineHeight = props && props.lineHeight ? props.lineHeight : this._lineHeight;
        this._offset = props && props.offset ? props.offset : this._offset;
        this._scale = props && props.scale ? props.scale : this._scale;
    };

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

    getLineHeight(): number {
        return this._lineHeight;
    }

    setLineHeight(value: number) {
        this._lineHeight = value;
    }

    getOffset(): number {
        return this._offset;
    }

    setOffset(value: number) {
        this._offset = value;
    }

    getScale(): number {
        return this._scale;
    }

    setScale(value: number) {
        this._scale = value;
    }

    generate(): fabric.Object[] {
        throw new Error('generate method is not implemented');
    }

}

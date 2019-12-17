import {fabric} from 'fabric';


export default class Ruler {

    private _object: Array<fabric.Object> = [];
    private _scale: number = 30;
    private _height: number = 5;
    private _x: number = 1;
    private _y: number = 1;
    private _offset: number = 5;
    private _color: string = 'black';
    private _fontSize: number = 16;

    getObject(): Array<fabric.Object> {
        return this._object;
    }

    getScale(): number {
        return this._scale;
    }

    setScale(value: number) {
        this._scale = value;
    }

    getHeight(): number {
        return this._height;
    }

    setHeight(value: number) {
        this._height = value;
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

    generate() {
        for (let i = 1; i <= this._scale; i++) {
            this._object.push(
                new fabric.Line([this._x + this._offset * i, this._y, this._x + this._offset * i, this._y + this._height], {
                        selectable: false,
                        stroke: 'black',
                        strokeWidth: 1,
                    }
                )
            );
            if (i % 5 === 1) {
                this._object.push(
                    new fabric.Line([this._x + this._offset * i, this._y + this._height, this._x + this._offset * i, this._y + this._height * 2], {
                            selectable: false,
                            stroke: 'black',
                            strokeWidth: 1,
                        }
                    )
                );
                if (i % 10 === 1) {
                    this._object.push(
                        new fabric.Text(String(i - 1), {
                            fontSize: 16,
                            top: this._height * 2,
                            left: this._x + this._offset * (i - 1)
                        })
                    );
                }
                this._object.push(
                    new fabric.Line([this._x + this._offset * i, this._y + this._height * 6, this._x + this._offset * i, this._y + this._height * 7], {
                            selectable: false,
                            stroke: 'black',
                            strokeWidth: 1,
                        }
                    )
                );
            }
            this._object.push(
                new fabric.Line([this._x + this._offset * i, this._y + this._height * 7, this._x + this._offset * i, this._y + this._height * 8], {
                        selectable: false,
                        stroke: 'black',
                        strokeWidth: 1,
                    }
                )
            );
        }
        return this._object;
    }

}
import {fabric} from 'fabric';
import Diagram, {DiagramProps} from './Diagram';


interface RulerProps extends DiagramProps {
}

export default class Ruler extends Diagram<RulerProps> {

    private readonly _object: fabric.Object[] = [];

    constructor(props?: Readonly<RulerProps>) {
        super(props);
    }

    getHeight(): number {
        return this.getLineHeight() / 8;
    }

    textStyle(text: string, scale: number) {
        return {
            selectable: false,
            fontSize: this.getFontSize(),
            shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
            top: this.getY() + (this.getHeight() * 7 - this.getFontSize()) / 2,
            left: this.getX() + this.getOffset() * scale - (text.length > 1 ? this.getFontSize() * text.length / 4 : 0),
            opacity: this.getOffset() * scale + this.getFontSize() / 2 * text.length < this.getOffset() * this.getScale() ? 1 : 0
        }
    }

    generate(): fabric.Object[] {
        for (let i = 0; i <= this.getScale(); i++) {
            this._object.push(
                new fabric.Line(
                    [
                        this.getX() + this.getOffset() * i,
                        this.getY(),
                        this.getX() + this.getOffset() * i,
                        this.getY() + this.getHeight()
                    ], {
                        selectable: false,
                        stroke: this.getColor(),
                        strokeWidth: 1
                    }
                )
            );
            if (i % 5 === 0 || i === this.getScale()) {
                this._object.push(
                    new fabric.Line(
                        [
                            this.getX() + this.getOffset() * i,
                            this.getY() + this.getHeight(),
                            this.getX() + this.getOffset() * i,
                            this.getY() + this.getHeight() * 2
                        ], {
                            selectable: false,
                            stroke: this.getColor(),
                            strokeWidth: 1
                        }
                    )
                );
                if (i % 10 === 0 && i !== 0) {
                    this._object.push(
                        new fabric.Text(String(i), this.textStyle(i.toString(), i))
                    );
                }
                this._object.push(
                    new fabric.Line(
                        [
                            this.getX() + this.getOffset() * i,
                            this.getY() + this.getHeight() * 6,
                            this.getX() + this.getOffset() * i,
                            this.getY() + this.getHeight() * 7
                        ], {
                            selectable: false,
                            stroke: this.getColor(),
                            strokeWidth: 1
                        }
                    )
                );
            }
            this._object.push(
                new fabric.Line(
                    [
                        this.getX() + this.getOffset() * i,
                        this.getY() + this.getHeight() * 7,
                        this.getX() + this.getOffset() * i,
                        this.getY() + this.getHeight() * 8
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
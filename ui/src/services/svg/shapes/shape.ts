import * as SVG from '@svgdotjs/svg.js';
import { v4 } from 'uuid';

interface LTShapeImpl {
    element: SVG.Element;
}

export class LTShape implements LTShapeImpl {
    protected figure: SVG.Shape | null;
    private readonly id: string;

    constructor() {
        this.id = v4();
        this.figure = null;
    }

    get element() {
        if (this.figure === null) throw new ReferenceError();
        return this.figure.node as unknown as SVG.Element;
    }
}

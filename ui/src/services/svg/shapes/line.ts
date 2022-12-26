import { Line } from '@svgdotjs/svg.js';
import { LTShape } from './shape';

export class LTLine extends LTShape {
    constructor() {
        super();
        this.figure = new Line();
    }
}

import { Rect } from '@svgdotjs/svg.js';
import { LTShape } from './shape';

export class LTRect extends LTShape {
    constructor() {
        super();
        this.figure = new Rect().size(100, 100).fill('red');
    }
}

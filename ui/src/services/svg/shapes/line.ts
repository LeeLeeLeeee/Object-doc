import { Line } from '@svgdotjs/svg.js';
import { SVGEventHelper } from '../helpers/event';
import { DragEventStrategy } from '../strategies/events/drag';
import { LTShape } from './shape';

export class LTLine extends LTShape {
    constructor() {
        super();
        const dragEvent = new DragEventStrategy({});
        const eventHelper = new SVGEventHelper();
        eventHelper.register(dragEvent);
        this.registerHandler(eventHelper);
    }

    mold(width: number = 40, height: number = 60): void {
        this.figure.line([
            [0, 0],
            [width, height],
        ]);
    }
}

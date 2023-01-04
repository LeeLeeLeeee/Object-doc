import { ArrayXY } from '@svgdotjs/svg.js';
import { SVGEventHelper } from '../helpers/event';
import { DragEventStrategy } from '../strategies/events/drag';
import { LTShape } from './shape';

export class LTPerson extends LTShape {
    constructor() {
        super();
        const dragEvent = new DragEventStrategy({});
        const eventHelper = new SVGEventHelper();
        eventHelper.register(dragEvent);
        this.registerHandler(eventHelper);
    }

    mold(width: number = 40, height: number = 60): void {
        const bodyStartNodePoint: ArrayXY = [Math.floor(width / 2), Math.floor(height / 10)];
        const bodyEndNodePoint: ArrayXY = [Math.floor(width / 2), Math.floor(height / 1.5)];
        const headerSize = Math.floor((width + height) / 6);
        this.figure.clear();
        /* body */
        this.figure.line([bodyStartNodePoint, bodyEndNodePoint]).stroke({ width: 2, color: 'black' }).addClass('body');
        /* arms */
        this.figure
            .line([
                [0, height / 2.3],
                [width, height / 2.3],
            ])
            .stroke({ width: 2, color: 'black' })
            .addClass('arms');

        /* legs */
        this.figure
            .line([bodyEndNodePoint, [0, height]])
            .stroke({ width: 2, color: 'black' })
            .addClass('left_leg');
        this.figure
            .line([bodyEndNodePoint, [width, height]])
            .stroke({ width: 2, color: 'black' })
            .addClass('right_leg');
        /* head */
        this.figure
            .circle(headerSize)
            .fill('black')
            .move(bodyStartNodePoint[0] - headerSize / 2, 0)
            .addClass('head');
    }
}

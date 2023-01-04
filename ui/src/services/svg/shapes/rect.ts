import { SVGEventHelper } from '../helpers/event';
import { DragEventStrategy } from '../strategies/events/drag';
import { LTShape } from './shape';

export class LTRect extends LTShape {
    constructor() {
        super();
        const dragEvent = new DragEventStrategy({});
        const eventHelper = new SVGEventHelper();
        eventHelper.register(dragEvent);
        this.registerHandler(eventHelper);
    }

    mold(width: number = 60, height: number = 40): LTRect {
        this.figure.rect(width, height).addClass('rect');
        return this;
    }
}

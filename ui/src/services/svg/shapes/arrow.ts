import { Element } from '@svgdotjs/svg.js';
import { SVGEventHelper } from '../helpers/event';
import { DragEventStrategy } from '../strategies/events/drag';
import { LTShape } from './shape';

interface ArrowMode {
    isDotLine?: boolean;
}

interface LTArrowImpl {
    setMode(mode: ArrowMode): void;
}

export class LTArrow extends LTShape implements LTArrowImpl {
    private isDotLine: boolean = false;

    constructor() {
        super();
        const dragEvent = new DragEventStrategy({});
        const eventHelper = new SVGEventHelper();
        eventHelper.register(dragEvent);
        this.registerHandler(eventHelper);
        this.figure.on('shiftstart', (evt) => {
            console.log(evt);
        });
    }

    setMode(mode: ArrowMode): void {
        this.isDotLine = mode.isDotLine ?? false;
    }

    mold(width: number = 50, height: number = 50): void {
        const arrowSize = 5; // TODO::how to manage this size
        this.figure
            .line([0, 0, width - 1, height - 1])
            .stroke({ width: 1, color: 'black' })
            .addClass('line');

        this.figure
            .polygon(`${width + 1},${height + 1} ${width - arrowSize},${height} ${width},${height - arrowSize}`)
            .fill('black')
            .addClass('to-vector');
        this.figure.polygon(`0,0 ${arrowSize},0 0,${arrowSize}`).fill('black').addClass('from-vector');
    }
}

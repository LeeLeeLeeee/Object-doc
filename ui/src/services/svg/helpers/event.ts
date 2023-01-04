import { Element, Shape } from '@svgdotjs/svg.js';
import { EventStrategy } from '../strategies/events';

export interface CoordinationType {
    x: number;
    y: number;
}

interface SVGEventHelperImpl {
    on(shape: Shape): void;
    off(shape: Shape): void;
    register(eventStrategy: EventStrategy): void;
}

export class SVGEventHelper implements SVGEventHelperImpl {
    private readonly _eventStrategies: EventStrategy[];

    constructor() {
        this._eventStrategies = [];
    }

    register(eventStrategy: EventStrategy): void {
        this._eventStrategies.push(eventStrategy);
    }

    on(shape: Shape): void {
        for (const handler of this._eventStrategies) {
            handler.on(shape);
        }
    }

    off(shape: Shape): void {
        for (const handler of this._eventStrategies) {
            handler.off(shape);
        }
    }
}

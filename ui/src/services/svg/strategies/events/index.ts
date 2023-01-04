import { Shape } from '@svgdotjs/svg.js';

export abstract class EventStrategy {
    public abstract off(shape: Shape): void;
    public abstract on(shape: Shape): void;
}

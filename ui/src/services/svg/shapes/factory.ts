import { Shape } from '@svgdotjs/svg.js';
import { LTLine } from './line';
import { LTRect } from './rect';
import { LTShape } from './shape';

export const ShapeType = {
    RECT: 'RECT',
    CIRCLE: 'CIRCLE',
    PERSON: 'PERSON',
    LINE: 'LINE',
} as const;

export type ShapeTypeGuard = typeof ShapeType[keyof typeof ShapeType];

interface ShapeFactoryImpl {
    createShape(type: ShapeTypeGuard): LTShape | null;
}

export class ShapeFactory implements ShapeFactoryImpl {
    createShape(type: ShapeTypeGuard): LTShape | null {
        switch (type) {
            case 'CIRCLE':
                return null;
            case 'PERSON':
                return null;
            case 'RECT':
                return new LTRect();
            case 'LINE':
                return new LTLine();
            default:
                return null;
        }
    }
}

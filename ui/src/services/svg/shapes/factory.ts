import { LTArrow } from './arrow';
import { LTLine } from './line';
import { LTPerson } from './person';
import { LTRect } from './rect';
import { LTShape } from './shape';
import { LTSVGText } from './text';

export const ShapeType = {
    RECT: 'RECT',
    CIRCLE: 'CIRCLE',
    PERSON: 'PERSON',
    LINE: 'LINE',
    ARROW: 'ARROW',
    TEXT: 'TEXT',
} as const;

export type ShapeTypeGuard = typeof ShapeType[keyof typeof ShapeType];

interface ShapeFactoryImpl {
    createShape(type: ShapeTypeGuard): LTShape | null;
}

export class ShapeFactory implements ShapeFactoryImpl {
    createShape(type: ShapeTypeGuard): LTShape | null {
        switch (type) {
            case ShapeType.CIRCLE:
                return null;
            case ShapeType.PERSON:
                return new LTPerson();
            case ShapeType.RECT:
                return new LTRect();
            case ShapeType.LINE:
                return new LTLine();
            case ShapeType.ARROW:
                return new LTArrow();
            case ShapeType.TEXT:
                return new LTSVGText();
            default:
                return null;
        }
    }
}

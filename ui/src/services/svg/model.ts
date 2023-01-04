import { NotMatchedError } from 'services/errors/not-matched-error';
import { Publisher } from 'services/publisher';
import { ShapeFactory, ShapeTypeGuard } from './shapes/factory';
import { LTShape } from './shapes/shape';
import { ViewUpdateReason } from './view';

export interface DrawOption {
    text?: string;
    trackingShapes?: LTShape[];
}

interface LTSVGModelImpl {
    draw(shape: ShapeTypeGuard, option?: DrawOption): void;
    remove(id: string): void;
    select(id: string): void;
}

export class LTSVGModel extends Publisher implements LTSVGModelImpl {
    private readonly shapes: LTShape[];
    private readonly factory: ShapeFactory;
    public current: LTShape | null;

    constructor() {
        super();
        this.shapes = [];
        this.current = null;
        this.factory = new ShapeFactory();
    }

    select(id: string): void {
        if (this.current?.id === id) return;
        if (this.current?.id !== id) this.clearCurrent();
        const [selected] = this.shapes.filter((shape) => shape.id === id);
        if (selected instanceof LTShape) {
            this.current = selected;
            this.current.active();
            this.current.onHandler();
        }
    }

    private clearCurrent(): void {
        if (this.current === null) return;
        this.current.offHandler();
        this.current.deactive();
        this.current = null;
    }

    draw(shape: ShapeTypeGuard, option?: DrawOption): void {
        this.clearCurrent();
        const drawnShape = this.factory.createShape(shape);
        if (drawnShape === null) throw new NotMatchedError("shape type deosn't matched");
        if (typeof option?.text === 'string') drawnShape.declareLabel(option.text);
        drawnShape.onHandler();
        drawnShape.mold();
        this.current = drawnShape;
        this.shapes.push(drawnShape);
        this.notify(ViewUpdateReason.DRAW);
    }

    remove(id: string): void {
        const removedIndex = this.shapes.findIndex((shape) => shape.id === id);
        if (removedIndex === -1) throw new NotMatchedError('No matching id found in the shapes.');
        const [removed] = this.shapes.splice(removedIndex, 1);
        removed.clear();
    }
}

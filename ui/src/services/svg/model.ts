import { NotMatchedError } from 'services/errors/not-matched-error';
import { Publisher, PublisherImpl } from 'services/publisher';
import { LTRect } from './shapes/rect';
import { LTShape } from './shapes/shape';
import { ViewUpdateReason } from './view';

interface LTSVGModelImpl {
    draw(shape: LTShape | null): void;
    remove(id: string): void;
}

export class LTSVGModel extends Publisher implements LTSVGModelImpl {
    private readonly shapes: LTShape[];
    public current: LTShape | null;

    constructor() {
        super();
        this.shapes = [];
        this.current = null;
    }

    draw(shape: LTShape | null): void {
        if (shape === null) throw new NotMatchedError('shape type');
        this.shapes.push(shape);
        this.current = shape;
        this.notify(ViewUpdateReason.DRAW);
    }

    remove(id: string): void {}
}

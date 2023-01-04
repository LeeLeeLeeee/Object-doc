import { DrawOption, LTSVGModel } from './model';
import { ShapeFactory, ShapeTypeGuard } from './shapes/factory';
import { LTShape } from './shapes/shape';

interface LTSVGControllerImpl {
    draw(shape: ShapeTypeGuard, option: DrawOption): void;
    select(id: string): void;
    current: LTShape | null;
}

export class LTSVGController implements LTSVGControllerImpl {
    private readonly model: LTSVGModel;

    get current() {
        return this.model.current;
    }

    constructor(model: LTSVGModel) {
        this.model = model;
    }

    select(id: string): void {
        this.model.select(id);
    }

    draw(shape: ShapeTypeGuard, option?: DrawOption): void {
        this.model.draw(shape, option);
    }
}

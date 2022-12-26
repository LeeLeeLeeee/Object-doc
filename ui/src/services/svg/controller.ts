import { LTSVGModel } from './model';
import { ShapeFactory, ShapeTypeGuard } from './shapes/factory';
import { LTShape } from './shapes/shape';

interface LTSVGControllerImpl {
    draw(shape: ShapeTypeGuard): void;
    current: LTShape | null;
}

export class LTSVGController implements LTSVGControllerImpl {
    private readonly model: LTSVGModel;
    private readonly factory: ShapeFactory;

    constructor(model: LTSVGModel) {
        this.model = model;
        this.factory = new ShapeFactory();
    }

    get current() {
        return this.model.current;
    }

    draw(shape: ShapeTypeGuard): void {
        this.model.draw(this.factory.createShape(shape));
    }
}

import { LTSVGController } from './controller';
import { DrawOption, LTSVGModel } from './model';
import { ShapeTypeGuard } from './shapes/factory';
import { LTSVGView } from './view';

interface SVGInstanceImpl {
    html(): HTMLDivElement;
    draw(shape: ShapeTypeGuard, option?: DrawOption): void;
}

export class SVGInstance implements SVGInstanceImpl {
    private readonly model: LTSVGModel;
    private readonly controller: LTSVGController;
    private readonly view: LTSVGView;

    constructor() {
        this.model = new LTSVGModel();
        this.controller = new LTSVGController(this.model);
        this.view = new LTSVGView(this.controller);
        this.model.register(this.view);
    }

    draw(shape: ShapeTypeGuard, option?: DrawOption): void {
        this.view.draw(shape, option);
    }

    public html(): HTMLDivElement {
        return this.view.html();
    }
}

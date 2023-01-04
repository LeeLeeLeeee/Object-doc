import { adopt, Container, Element } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';
import 'services/svg/extends/gaze';
import { LTSVGController } from './controller';
import { DrawOption } from './model';
import { ShapeTypeGuard } from './shapes/factory';
import { SubscriberImpl } from 'services/publisher';
import { NotMatchedError } from 'services/errors/not-matched-error';
import { LTShape } from './shapes/shape';
import { LTArrow } from './shapes/arrow';
import { LTRect } from './shapes/rect';

export const ViewUpdateReason = {
    DRAW: 'draw',
    DELETE: 'delete',
} as const;

type UpadteReasonGuard = typeof ViewUpdateReason[keyof typeof ViewUpdateReason];

export const SVG_EVENT: Record<string, { name: string; option: CustomEventInit<any> }> = {
    DRAW: {
        name: 'svg.draw',
        option: {
            cancelable: false,
        },
    },
} as const;

interface LTSVGViewImpl {
    html(): HTMLElement;
    draw(shaeType: ShapeTypeGuard, option?: DrawOption): void;
    currentId: string;
}

export class LTSVGView implements LTSVGViewImpl, SubscriberImpl {
    private readonly svgElement: SVGSVGElement;
    private readonly controller: LTSVGController;
    private readonly svgInstance: Container;
    private readonly container: HTMLDivElement;
    public subscriberId: string;

    constructor(controller: LTSVGController) {
        this.subscriberId = '';
        this.controller = controller;
        this.container = window.document.createElement('div');
        this.svgElement = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.initContainer();
        this.svgInstance = adopt(this.svgElement as any) as Container;
        this.html = this.html.bind(this);
        this.handleShapeMouseDown = this.handleShapeMouseDown.bind(this);
    }

    get currentId() {
        if (this.controller.current === null) throw new ReferenceError("current shape isn't defined");
        return this.controller.current.id;
    }

    listen(reason: UpadteReasonGuard) {
        switch (reason) {
            case ViewUpdateReason.DRAW: {
                if (this.controller.current === null) throw new ReferenceError("shape doesn't be created");
                this.svgInstance.add(this.controller.current.element);
                // this.controller.current.onBaseEvent('click', this.handleShapeMouseDown);
                if (this.controller.current instanceof LTArrow) {
                    const rect1 = new LTRect().mold();
                    const rect2 = new LTRect().mold();
                    rect2.element.fill('red').draggable();
                    rect1.element.draggable();
                    this.svgInstance.add(rect1.element).add(rect2.element);
                    this.controller.current.setGazeTargets([rect1, rect2]);
                    this.controller.current.onGaze();
                }
                break;
            }
            case ViewUpdateReason.DELETE: {
                console.log('delete');
                break;
            }
            default: {
                throw new NotMatchedError('view listen reason props');
            }
        }
    }

    draw(shaeType: ShapeTypeGuard, option?: DrawOption) {
        this.controller.draw(shaeType, option);
    }

    html() {
        return this.container;
    }

    private initContainer() {
        this.container.setAttribute('style', 'width: 100%; height: 100%');
        this.svgElement.setAttribute('style', 'width: 100%; height: 100%');
        this.container.appendChild(this.svgElement);
    }

    private fire(event: CustomEvent) {
        this.container.dispatchEvent(event);
    }

    private handleShapeMouseDown(shape: LTShape) {
        this.controller.select(shape.id);
    }
}

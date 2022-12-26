import { adopt, Container, SVG } from '@svgdotjs/svg.js';
import { LTSVGController } from './controller';
import { LTSVGModel } from './model';
import '@svgdotjs/svg.draggable.js';
import { ShapeTypeGuard } from './shapes/factory';
import { SubscriberImpl } from 'services/publisher';
import { NotMatchedError } from 'services/errors/not-matched-error';

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
    html(): Element;
    draw(shaeType: ShapeTypeGuard): void;
}

export class LTSVGView implements LTSVGViewImpl, SubscriberImpl {
    private readonly svgElement: SVGSVGElement;
    private readonly controller: LTSVGController;
    private readonly model: LTSVGModel;
    private readonly svgInstance: Container;
    private readonly container: HTMLDivElement;
    public subscriberId: string;

    constructor(model: LTSVGModel, controller: LTSVGController) {
        this.subscriberId = '';
        this.controller = controller;
        this.model = model;
        this.container = window.document.createElement('div');
        this.svgElement = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.initContainer();
        this.svgInstance = adopt(this.svgElement as any) as Container;
        this.html = this.html.bind(this);
    }

    listen(reason: UpadteReasonGuard) {
        switch (reason) {
            case ViewUpdateReason.DRAW: {
                if (this.controller.current === null) throw new ReferenceError("shape doesn't be created");
                this.svgInstance.add(this.controller.current.element);

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

    draw(shaeType: ShapeTypeGuard) {
        this.controller.draw(shaeType);
    }

    private initContainer() {
        this.container.setAttribute('style', 'width: 100%; height: 100%');
        this.svgElement.setAttribute('style', 'width: 100%; height: 100%');

        this.container.appendChild(this.svgElement);
    }

    html() {
        return this.container;
    }

    private fire(event: CustomEvent) {
        this.container.dispatchEvent(event);
    }
}

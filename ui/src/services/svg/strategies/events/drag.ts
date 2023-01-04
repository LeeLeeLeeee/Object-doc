import { Shape } from '@svgdotjs/svg.js';
import { EventStrategy } from '.';

interface Props {
    handleBeforeDrag?: (e?: Event) => void;
    handleDragStart?: (e?: Event) => void;
    handleDragMove?: (e?: Event) => void;
    handleDragEnd?: (e?: Event) => void;
}

export class DragEventStrategy extends EventStrategy {
    private readonly _props: Partial<Props>;

    constructor(props: Partial<Props>) {
        super();
        this._props = props;
    }

    public off(shape: Shape): void {
        shape.draggable(false).off('beforedrag').off('dragstart').off('dragmove').off('dragend');
    }

    public on(shape: Shape): void {
        shape
            .draggable()
            .on('beforedrag', (e) => {
                if (typeof this._props.handleBeforeDrag === 'function') this._props.handleBeforeDrag(e);
            })
            .on('dragstart', (e) => {
                if (typeof this._props.handleDragStart === 'function') this._props.handleDragStart(e);
            })
            .on('dragmove', (e) => {
                if (typeof this._props.handleDragMove === 'function') this._props.handleDragMove(e);
            })
            .on('dragend', (e) => {
                if (typeof this._props.handleDragEnd === 'function') this._props.handleDragEnd(e);
            });
    }
}

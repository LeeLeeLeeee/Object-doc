import { Box, Element, extend, off, on, Point } from '@svgdotjs/svg.js';

const getCoordsFromEvent = (ev: any) => {
    if (ev.changedTouches) {
        ev = ev.changedTouches[0];
    }
    return { x: ev.clientX, y: ev.clientY };
};

// Creates handler, saves it
export class GazeHandler {
    private readonly el: Element;
    private readonly gazeTarget: Element;
    private index: number;
    private box: Box | null;
    private lastClick: Point | null;

    constructor(el: Element, target: Element) {
        this.el = el;
        this.gazeTarget = target;
        this.box = null;
        this.lastClick = null;
        this.index = 0;
        this.drag = this.drag.bind(this);
        this.startGaze = this.startGaze.bind(this);
        this.endDrag = this.endDrag.bind(this);
    }

    // Enables or disabled drag based on input
    init(enabled: boolean) {
        if (enabled) {
            this.gazeTarget.on('mousedown.gaze', this.startGaze as any);
            this.gazeTarget.on('touchstart.gaze', this.startGaze as any);
        } else {
            this.gazeTarget.off('mousedown.gaze');
            this.gazeTarget.off('touchstart.gaze');
        }
    }

    setIndex(index: number) {
        this.index = index;
    }

    // Start dragging
    private startGaze(ev: MouseEvent) {
        console.log(ev);
        const isMouse = !ev.type.indexOf('mouse');

        // Check for left button
        if (isMouse && (ev.which || ev.buttons) !== 1) {
            return;
        }

        // Fire beforedrag event
        if (this.el.dispatch('beforeshift', { event: ev, handler: this, index: this.index }).defaultPrevented) {
            return;
        }

        // Prevent browser drag behavior as soon as possible
        ev.preventDefault();

        // Prevent propagation to a parent that might also have dragging enabled
        ev.stopPropagation();

        // Make sure that start events are unbound so that one element
        // is only dragged by one input only
        this.init(false);

        this.box = this.el.bbox();
        this.lastClick = this.el.point(getCoordsFromEvent(ev));

        // We consider the drag done, when a touch is canceled, too
        const eventMove = (isMouse ? 'mousemove' : 'touchmove') + '.gaze';
        const eventEnd = (isMouse ? 'mouseup' : 'touchcancel.gaze touchend') + '.gaze';

        // Bind drag and end events to window
        on(window, eventMove, this.drag as any);
        on(window, eventEnd, this.endDrag as any);

        // Fire dragstart event
        this.el.fire('shiftstart', { event: ev, handler: this, box: this.box, index: this.index });
    }

    // While dragging
    private drag(ev: MouseEvent) {
        const { box, lastClick } = this;
        if (box === null || lastClick === null) return;

        const currentClick = this.gazeTarget.point(getCoordsFromEvent(ev));
        const x = box.x + (currentClick.x - lastClick.x);
        const y = box.y + (currentClick.y - lastClick.y);
        const newBox = new Box(x, y, box.w, box.h);

        if (
            this.el.dispatch('shiftongoing', {
                event: ev,
                handler: this,
                box: newBox,
                index: this.index,
            }).defaultPrevented
        )
            return;
        return newBox;
    }

    private endDrag(ev: MouseEvent) {
        // final drag
        const box = this.drag(ev);

        // fire dragend event
        this.el.fire('shiftend', { event: ev, handler: this, box, index: this.index });

        // unbind events
        off(window, 'mousemove.gaze');
        off(window, 'touchmove.gaze');
        off(window, 'mouseup.gaze');
        off(window, 'touchend.gaze');

        // Rebind initial Events
        this.init(true);
    }
}

interface Props {
    gazeTarget: Element;
    index?: number;
    enable?: boolean;
}
extend(Element, {
    gaze(props: Props) {
        const { gazeTarget, index = 0, enable = true } = props;
        const gazeHandler = new GazeHandler(this as Element, gazeTarget);
        gazeHandler.init(enable);
        gazeHandler.setIndex(index);
        return this;
    },
});

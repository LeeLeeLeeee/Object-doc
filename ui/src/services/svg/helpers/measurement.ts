import { Shape } from '@svgdotjs/svg.js';

export interface CoordinationType {
    x: number;
    y: number;
}

interface SVGMeasurementHelperImpl {
    calculateWidth(shape: Shape): number;
    calculateHeight(shape: Shape): number;
    calculateLeftTopCoordination(shape: Shape): CoordinationType;
    calculateRightBottomCoordination(shape: Shape): CoordinationType;
}

export class SVGMeasurementHelper implements SVGMeasurementHelperImpl {
    calculateLeftTopCoordination(shape: Shape): CoordinationType {
        const { x, y } = shape.bbox();
        return {
            x,
            y,
        };
    }

    calculateRightBottomCoordination(shape: Shape): CoordinationType {
        const { x2, y2 } = shape.bbox();
        return {
            x: x2,
            y: y2,
        };
    }

    calculateWidth(shape: Shape): number {
        return shape.bbox().width;
    }

    calculateHeight(shape: Shape): number {
        return shape.bbox().height;
    }
}

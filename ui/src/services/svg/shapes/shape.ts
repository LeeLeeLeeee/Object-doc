/* eslint-disable n/no-callback-literal */
import * as SVG from '@svgdotjs/svg.js';
import { ParameterError } from 'services/errors/parameter-error';
import { v4 } from 'uuid';
import { SVGEventHelper } from '../helpers/event';
import { Following } from '../helpers/follwing';
import { CoordinationType, SVGMeasurementHelper } from '../helpers/measurement';

interface LTShapeImpl {
    element: SVG.Element;
    width: number;
    height: number;
    lt: CoordinationType;
    rb: CoordinationType;
    declareLabel(label: string): void;
    registerHandler(helper: SVGEventHelper): void;
    onHandler(): void;
    offHandler(): void;
    onBaseEvent(event: string, callback: (shape: LTShape) => void): void;
    onGaze(): void;
    offGaze(): void;
    setGazeTargets(shapes: LTShape[]): void;
    clear(): void;
    active(): void;
    deactive(): void;
    mold(width?: number, height?: number): void;
}
export class LTShape implements LTShapeImpl {
    protected _figure: SVG.G | null;
    private readonly _measurementHelper: SVGMeasurementHelper;
    private readonly _following: Following;
    private _eventMediators: SVGEventHelper | null;
    public readonly id: string;

    constructor() {
        this._eventMediators = null;
        this.id = v4();
        this._measurementHelper = new SVGMeasurementHelper();
        this._following = new Following(this);
        this._figure = SVG.SVG(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
    }

    setGazeTargets(shapes: LTShape[]): void {
        if (shapes.some((shape) => shape.id === this.id)) throw new ParameterError('same id');
        this._following.setTargets(shapes);
    }

    mold(width?: number, height?: number) {
        throw new Error('please specify this method in child object');
    }

    active(): void {
        this.figure.addClass('active');
    }

    deactive(): void {
        this.figure.removeClass('active');
    }

    onGaze(): void {
        this._following.on();
    }

    offGaze(): void {
        this._following.off();
    }

    onBaseEvent(eventName: string, callback: (shape: LTShape) => void) {
        this.figure.on(eventName, () => {
            callback(this);
        });
    }

    clear(): void {
        if (this._eventMediators !== null) this._eventMediators.off(this.figure);
        this.figure.remove();
        this._figure = null;
    }

    registerHandler(helper: SVGEventHelper): void {
        this._eventMediators = helper;
    }

    onHandler(): void {
        if (this._eventMediators !== null) this._eventMediators.on(this.figure);
    }

    offHandler(): void {
        if (this._eventMediators !== null) this._eventMediators.off(this.figure);
    }

    declareLabel(label: string): void {
        this.figure.text(label);
    }

    protected get figure() {
        if (this._figure === null) throw new ReferenceError("figure of shape isn't not defined");
        return this._figure;
    }

    get width() {
        return this._measurementHelper.calculateWidth(this.figure);
    }

    get height() {
        return this._measurementHelper.calculateHeight(this.figure);
    }

    get lt() {
        return this._measurementHelper.calculateLeftTopCoordination(this.figure);
    }

    get rb() {
        return this._measurementHelper.calculateRightBottomCoordination(this.figure);
    }

    get element() {
        return this.figure;
    }
}

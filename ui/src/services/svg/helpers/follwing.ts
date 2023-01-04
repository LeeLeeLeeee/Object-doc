import { LTShape } from '../shapes/shape';

export class Following {
    private readonly _follwer: LTShape;
    private _targets: LTShape[];

    constructor(follower: LTShape) {
        this._targets = [];
        this._follwer = follower;
    }

    setTargets(shapes: LTShape[]) {
        this._targets = shapes;
    }

    on() {
        this._targets.forEach((target, index) => {
            console.log(target);
            this._follwer.element.gaze({ gazeTarget: target.element, index });
        });
    }

    off() {
        for (const target of this._targets) {
            this._follwer.element.gaze({ gazeTarget: target.element, enable: false });
        }
    }
}

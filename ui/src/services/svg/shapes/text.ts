import { SVG, Text } from '@svgdotjs/svg.js';
import { LTShape } from './shape';

interface LTSVGTextImpl {
    init(text: string): void;
}

export class LTSVGText extends LTShape implements LTSVGTextImpl {
    init(text: string): void {
        this.figure.text(text);
    }
}

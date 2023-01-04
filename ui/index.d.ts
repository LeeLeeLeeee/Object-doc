import type { Theme as BaseTheme, ThemeUIStyleObject } from 'theme-ui';
import { Element } from '@svgdotjs/svg.js';
import { GazeHandler } from 'services/svg/extends/gaze';
declare module '*.svg';

declare module 'theme-ui' {
    export interface Theme extends BaseTheme {
        letten: Record<string, ThemeUIStyleObject>;
    }
}

declare module '@emotion/react' {
    export interface Theme extends BaseTheme {
        letten: Record<string, ThemeUIStyleObject>;
        colors: Record<string, any>;
    }
}

declare module '@svgdotjs/svg.js' {
    interface Element {
        gaze(props: { gazeTarget: Element; index?: number; enable?: boolean }): Element;
    }
}

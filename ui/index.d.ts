import type { Theme as BaseTheme, ThemeUIStyleObject } from 'theme-ui';

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

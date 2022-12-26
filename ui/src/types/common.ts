/* eslint-disable no-unused-vars */
import { PATH } from 'const';
import React from 'react';

export interface ExtendChildren {
    children: React.ReactNode;
}

export type ActionUnion<A extends { [key in string]: any }> = ReturnType<A[keyof A]>;

export type VerticalGuard = 'top' | 'middle' | 'bottom';
export type HorizontalGuard = 'left' | 'center' | 'right';

export const ToastType = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    LOADING: 'loading',
    NONE: 'none',
} as const;

export type ToastGuard = typeof ToastType[keyof typeof ToastType];
export type PathGuard = keyof typeof PATH;

export interface ToastProps {
    id: string;
    type: ToastGuard;
    content: React.ReactNode;
    isConfirm: boolean;
    duration: number;

    executeAfterConfirm?: () => void;
}

export type ArrayElementType<A> = A extends ReadonlyArray<infer T> ? T : never;

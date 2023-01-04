/* eslint-disable n/no-callback-literal */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

export function debounce<T>(
    callback: T extends (...args: infer A) => void ? (...args: A) => void : never,
    wait = 200
): (...args: Parameters<typeof callback>) => void {
    let clearId: any = null;
    return (...args) => {
        if (clearId) clearTimeout(clearId);
        clearId = setTimeout(() => {
            callback(...args);
            clearId = null;
        }, wait);
    };
}

export function throttle<T>(
    callback: T extends (...args: infer A) => void ? (...args: A) => void : never,
    duration = 200
): (...args: Parameters<typeof callback>) => void {
    let clearId: any = null;
    let count = 0;
    return (...args) => {
        if (clearId) return;
        if (count === 0) {
            callback(...args);
            count += 1;
        }

        clearId = setTimeout(() => {
            callback(...args);
            clearId = null;
            count += 1;
        }, duration);
    };
}

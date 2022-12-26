/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';

interface Props {
    value: any;
    callback(value: any): void;
}

export function useDiffer({ value, callback }: Props) {
    const prev = useRef(value);

    useEffect(() => {
        if (JSON.stringify(prev.current) !== JSON.stringify(value)) {
            prev.current = value;
            callback(value);
        }
    }, [value]);
}

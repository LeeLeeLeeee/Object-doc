import { HorizontalGuard, VerticalGuard } from '@/types/common';
import { calculateAnchorPosition } from '@/utils/dom';
import { MutableRefObject, useEffect, useState } from 'react';

export interface HookTargetPositionProps {
    anchorPostion: {
        vertical: VerticalGuard;
        horizon: HorizontalGuard;
    };
    targetPoistion: {
        vertical: VerticalGuard;
        horizon: 'left' | 'right';
    };
    gap: number;
    targetElement: MutableRefObject<any>;
}

export function useTargetPosition(props: HookTargetPositionProps, depth?: any) {
    const { gap, anchorPostion, targetPoistion, targetElement } = props;
    const [position, setPosition] = useState<Record<string, number>>({});

    useEffect(() => {
        if (targetElement.current !== undefined) {
            setPosition(
                calculateAnchorPosition(
                    (targetElement.current as HTMLElement).getBoundingClientRect(),
                    anchorPostion,
                    targetPoistion,
                    gap
                )
            );
        }
    }, [depth]);

    return {
        position,
    };
}

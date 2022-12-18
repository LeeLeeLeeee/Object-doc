import { HorizontalGuard, VerticalGuard } from '@/types/common';

type PostionType = {
    vertical: VerticalGuard;
    horizon: HorizontalGuard;
};

const calculateVertical = (rect: DOMRect, anchorVertical: VerticalGuard, targetVertical: VerticalGuard): number => {
    switch (anchorVertical) {
        case 'bottom':
            return targetVertical === 'bottom' ? window.innerHeight - rect.bottom : rect.bottom;
        case 'middle':
            return +(rect.height / 2).toFixed(1) + rect.top;
        case 'top':
            return targetVertical === 'bottom' ? window.innerHeight - rect.top : rect.top;
        default:
            return 0;
    }
};

const calculateHorizon = (rect: DOMRect, anchorHorizon: HorizontalGuard, targetHorizon: HorizontalGuard): number => {
    switch (anchorHorizon) {
        case 'left':
            return targetHorizon === 'right' ? window.innerWidth - rect.left : rect.left;
        case 'center':
            return +(rect.width / 2).toFixed(1) + rect.left;
        case 'right':
            return targetHorizon === 'right' ? window.innerWidth - rect.right : rect.right;
        default:
            return 0;
    }
};
export function calculateAnchorPosition(
    rect: DOMRect,
    anchor: PostionType,
    target: PostionType,
    gap: number
): Record<string, number> {
    const tpv = target.vertical === 'bottom' ? 'bottom' : 'top';
    const tph = target.horizon === 'right' ? 'right' : 'left';

    return {
        [tpv]: calculateVertical(rect, anchor.vertical, target.vertical) + gap,
        [tph]: calculateHorizon(rect, anchor.horizon, target.horizon),
    };
}

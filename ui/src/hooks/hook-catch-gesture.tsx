/* eslint-disable consistent-return */
import React, { useRef, useState, useLayoutEffect } from 'react';
import { useUnmount } from './hook-unmount';

interface Props {
    target: React.RefObject<HTMLElement>;
    heightForRefresh?: number;
    handleRefresh(): void;
}

export function useCatchGesture(props: Props) {
    const { target, handleRefresh, heightForRefresh = 60 } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [height, setHeight] = useState(0);
    const [percent, setPercent] = useState(0);
    const touchStartY = useRef<number | null>(null);

    function handleTouchStart(e: any) {
        if (target.current === null) return;
        if (target.current.scrollTop !== 0) return;
        touchStartY.current = e.changedTouches[0].screenY;
    }
    function handleTouchMove(e: any) {
        if (typeof touchStartY.current === 'number') {
            const { screenY } = e.changedTouches[0];
            const scrolledHeight = Math.floor((screenY - touchStartY.current) * 0.3);
            if (scrolledHeight >= 0) {
                setIsOpen(true);
                setHeight(scrolledHeight);
                setPercent(scrolledHeight >= heightForRefresh ? 1 : +(scrolledHeight / heightForRefresh).toFixed(2));
            }
        }
    }
    function handleTouchEnd() {
        if (typeof touchStartY.current === 'number' && height >= heightForRefresh) {
            handleRefresh();
            setIsStart(true);
        } else {
            touchStartY.current = null;
            setHeight(0);
            setIsOpen(false);
        }
    }

    function end() {
        touchStartY.current = null;
        setIsStart(false);
        setIsOpen(false);
    }

    useLayoutEffect(() => {
        if (target.current === null) return;
        target.current.addEventListener('touchstart', handleTouchStart);
        target.current.addEventListener('touchmove', handleTouchMove);
        target.current.addEventListener('touchend', handleTouchEnd);
        return () => {
            if (target.current === null) return;
            target.current.removeEventListener('touchstart', handleTouchStart);
            target.current.removeEventListener('touchmove', handleTouchMove);
            target.current.removeEventListener('touchend', handleTouchEnd);
        };
    }, [height]);

    useUnmount(() => {
        if (target.current === null) return;
        target.current.removeEventListener('touchstart', handleTouchStart);
        target.current.removeEventListener('touchmove', handleTouchMove);
        target.current.removeEventListener('touchend', handleTouchEnd);
    });

    return {
        isOpen,
        isStart,
        percent,
        end,
    };
}

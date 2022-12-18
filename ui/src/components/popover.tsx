/** @jsxImportSource theme-ui */
import { ExtendChildren } from '@/types/common';
import React, { ReactElement, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HookTargetPositionProps, useTargetPosition } from '@/hooks/hook-target-position';
import { useOnce } from '@/hooks/hook-once';
import { useUnmount } from '@/hooks/hook-unmount';
import { Portal } from './portal';

interface Props extends ExtendChildren, Partial<Omit<HookTargetPositionProps, 'targetElement'>> {
    asContent: React.ReactNode;
}

export function LTPopover(props: Props) {
    const {
        children,
        asContent,
        gap = 0,
        anchorPostion = { horizon: 'left', vertical: 'bottom' },
        targetPoistion = { horizon: 'left', vertical: 'top' },
    } = props;
    const [selfOpen, setSelfOpen] = useState(false);

    const targetRef = useRef();
    const { position } = useTargetPosition(
        {
            gap,
            anchorPostion,
            targetPoistion,
            targetElement: targetRef,
        },
        selfOpen
    );

    const handleTrigger = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSelfOpen((status) => !status);
    };

    const handleClosePopover = () => {
        setSelfOpen(false);
    };

    useOnce(() => {
        if (targetRef.current) {
            (targetRef.current as HTMLElement).addEventListener('click', handleTrigger);
            document.body.addEventListener('click', handleClosePopover);
        }
    });

    useUnmount(() => {
        if (targetRef.current) {
            (targetRef.current as HTMLElement).removeEventListener('click', handleTrigger);
            document.body.addEventListener('remove', handleClosePopover);
        }
    });

    return (
        <>
            {React.cloneElement(children as ReactElement, { ref: targetRef })}
            <Portal>
                <AnimatePresence exitBeforeEnter>
                    {selfOpen && (
                        <motion.div
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            sx={{ ...position, position: 'absolute', display: 'inline-block', zIndex: 999 }}
                            transition={{ duration: 0.1, delay: 0.2 }}
                        >
                            {asContent}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Portal>
        </>
    );
}

export type { Props as PopoverProps };

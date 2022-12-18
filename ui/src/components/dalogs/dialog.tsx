/* eslint-disable react/no-unknown-property */
/** @jsxImportSource theme-ui */

import { ExtendChildren } from '@/types/common';
import { MouseEventHandler, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUnmount } from '@/hooks/hook-unmount';
import backdrop from '../backdrop';
import { Portal } from '../portal';

interface Props extends ExtendChildren {
    onClose: MouseEventHandler<HTMLElement>;
    position: 'top' | 'middle' | 'bottom';
    isOpen?: boolean;
}

export function LTDialog(props: Props) {
    const { onClose, children, position, isOpen = false } = props;

    useEffect(() => {
        if (isOpen) {
            backdrop.handleClick(onClose);
            backdrop.open();
        } else {
            backdrop.close();
        }
    }, [isOpen]);
    useUnmount(() => {
        backdrop.close();
    });
    return (
        <Portal>
            <AnimatePresence>
                {isOpen ? (
                    <div aria-hidden sx={{ variant: `letten.dialog.${position}` }} onClick={onClose}>
                        <motion.div
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            sx={{ width: '100%', maxWidth: 343 }}
                            transition={{ ease: 'easeInOut' }}
                        >
                            {children}
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
        </Portal>
    );
}

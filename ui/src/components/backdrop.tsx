/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/no-unused-state */
/** @jsxImportSource theme-ui */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Portal } from './portal';

interface State {
    isOpen?: boolean;
    onClick?: () => void;
    count: number;
}

export class LTBackdrop extends React.PureComponent<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            isOpen: false,
            onClick: undefined,
            count: 0,
        };
        this.handleClick = this.handleClick.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    handleClick(func: () => void) {
        this.setState((prevState) => ({
            ...prevState,
            onClick: func,
        }));
    }

    open() {
        this.setState((state) => ({
            isOpen: true,
            count: state.count + 1,
        }));
    }

    close() {
        this.setState((prevState) => {
            if (prevState.count === 1) {
                return {
                    isOpen: false,
                    count: 0,
                };
            }
            if (prevState.count > 1) {
                return { count: prevState.count - 1 };
            }
            return { ...prevState };
        });
    }

    render() {
        const {
            isOpen,
            onClick = () => {
                console.log('warn');
            },
        } = this.state;

        return (
            <Portal>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            animate={{ opacity: 1 }}
                            aria-hidden
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            sx={{ variant: 'letten.backdrop' }}
                            transition={{ duration: 0.3 }}
                            onClick={onClick}
                        />
                    )}
                </AnimatePresence>
            </Portal>
        );
    }
}

const warn: any = () => console.log('have not resgiter the popup yet');

const backdrop = {
    open: warn,
    close: warn,
    handleClick: warn,
};

export const registerBackdrop = (ref: any) => {
    if (ref) {
        backdrop.open = ref.open;
        backdrop.close = ref.close;
        backdrop.handleClick = ref.handleClick;
    } else {
        backdrop.open = warn;
        backdrop.close = warn;
        backdrop.handleClick = warn;
    }
};

export default backdrop;

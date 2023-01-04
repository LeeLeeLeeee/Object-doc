/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable no-unused-vars */
// import { ClearIcon, ErrorIcon } from 'icons';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement, useMemo } from 'react';
import { Input, InputProps, Label } from 'theme-ui';
import { Column, Row } from '../flex';

interface Props extends InputProps {
    value?: string;
    helpreText?: string;
    errorMessage?: string;
    isError?: boolean;
    asStartIcon?: ReactElement;
    asEndIcon?: ReactElement;
    onClear?: () => void;
}

export const LTTextField = React.forwardRef((props: Props, ref: any) => {
    const { value, helpreText, asStartIcon, asEndIcon, isError, onClear, errorMessage, sx = {}, ...rest } = props;

    let renderEndIcon = asEndIcon;

    renderEndIcon = useMemo(() => {
        if (renderEndIcon !== undefined) return renderEndIcon;
        if (!isError && !value) return undefined;
        return <span onClick={onClear}>{isError ? <div>error</div> : <div>clear</div>}</span>;
    }, [!!value, isError]);

    return (
        <Column sx={{ width: '100%' }}>
            <Label sx={{ ...sx }} variant={`forms.textFieldLabel${isError ? 'Error' : ''}`}>
                {asStartIcon}
                <Input ref={ref} value={value} variant="forms.textField" {...rest} />
                {renderEndIcon}
            </Label>
            {helpreText && (
                <AnimatePresence exitBeforeEnter>
                    <Row
                        alignSelf="stretch"
                        justifyContent="flex-start"
                        variant={`forms.textFieldHelperText${isError ? 'Error' : ''}`}
                    >
                        <motion.div
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            initial={{ y: -10, opacity: 0 }}
                            key={isError ? 'Error' : ''}
                            transition={{ duration: 0.2 }}
                        >
                            {isError ? errorMessage || helpreText : helpreText}
                        </motion.div>
                    </Row>
                </AnimatePresence>
            )}
        </Column>
    );
});

LTTextField.displayName = 'LTTextField';

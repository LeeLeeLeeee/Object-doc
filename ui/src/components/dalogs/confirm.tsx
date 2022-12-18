/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-expressions */
import { createRoot } from 'react-dom/client';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { theme } from '@/theme';
import { Column, Row } from '../flex';
import { LTDialog } from './dialog';

import { LTText } from '../text';
import { LTButton } from '../buttons/button';

interface ConfirmProps {
    title?: string;
    content?: string;
    okText?: string;
    cancelText?: string;
    handleOkClick?: () => void;
    handleCancelClick?: () => void;
}

export default function confirm(config: ConfirmProps) {
    const container = document.createDocumentFragment();
    const root = createRoot(container);

    function destory() {
        root.unmount();
    }

    function handleOkClick() {
        config.handleOkClick && config.handleOkClick();
        destory();
    }

    function handleCancelClick() {
        config.handleCancelClick && config.handleCancelClick();
        destory();
    }

    function render() {
        root.render(
            <EmotionThemeProvider theme={theme as any}>
                <LTDialog isOpen position="middle" onClose={destory}>
                    <Column
                        alignItems="flex-start"
                        sx={{ bg: 'rgba(19, 19, 20, 0.75);', p: 7, backdropFilter: 'blur(40px)', borderRadius: '20px' }}
                    >
                        {config.title ? (
                            <LTText $color="background" $variant="xml">
                                {config.title}
                            </LTText>
                        ) : null}
                        {config.content ? (
                            <LTText $color="background" sx={{ fontWeight: 'body' }}>
                                {config.content}
                            </LTText>
                        ) : null}

                        <Row alignSelf="stretch" justifyContent="flex-end" sx={{ mt: '40px', gap: 5 }}>
                            {config.okText ? (
                                <LTButton $variant="none" sx={{ fontSize: 2, p: 0 }} onClick={handleOkClick}>
                                    {config.okText}
                                </LTButton>
                            ) : null}
                            {config.cancelText ? (
                                <LTButton $variant="none" sx={{ fontSize: 2, p: 0 }} onClick={handleCancelClick}>
                                    {config.cancelText}
                                </LTButton>
                            ) : null}
                        </Row>
                    </Column>
                </LTDialog>
            </EmotionThemeProvider>
        );
        document.getElementById('__next')?.appendChild(container);
    }

    render();
}

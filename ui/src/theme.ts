import { Theme, ThemeUIStyleObject } from 'theme-ui';

const DISABLED_BUTTON = {
    outlined: {
        '&:disabled': {
            color: 'muted',
            borderColor: 'muted',
        },
    },
    fill: {
        '&:disabled': {
            opacity: 0.2,
        },
    },
};

const COLOR = {
    primary: '#125B50',
    secondary: '#F6C6EA',
    info: '#8CB7EF',
    muted: '#C7C7C7',
    danger: '#FF6363',
    text: '#131314',
    background: '#F9F9F9',
    black: '#131314',
} as const;

export type COLOR_GUARD = keyof typeof COLOR;
export type VARIANT_GUARD = 'outlined' | 'fill' | 'none';
export type TEXT_GUARD = 'sm' | 'md' | 'ml' | 'xml' | 'lg' | 'xlg' | 'xxlg';

const createCustomButtonTheme = (color: COLOR_GUARD): Record<string, ThemeUIStyleObject> => ({
    [color]: {
        outlined: {
            variant: 'buttons.default',
            borderColor: color,
            color,
            ...DISABLED_BUTTON.outlined,
        },
        fill: {
            variant: 'buttons.default',
            bg: color,
            borderColor: color,
            color: color === 'background' ? 'black' : 'white',
            ...DISABLED_BUTTON.fill,
        },
        none: {
            variant: 'buttons.default',
            borderColor: 'transparent',
            color,
        },
    },
});

export const theme: Theme = {
    fonts: {
        body: 'sf-pro -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    },
    colors: {
        ...(COLOR as any),
        gray: ['#EFEFEF', '#B1B1B1', '#F9F9F9'],
    },
    fontWeights: {
        body: 500,
        bold: 700,
        extraBold: 900,
    },
    space: [0, 4, 8, 12, 16, 20, 24, 28, 32],
    text: {
        sm: {
            color: 'text',
            fontWeight: 'bold',
            fontFamily: 'body',
            fontSize: 0,
            lineHeight: '17px',
        },
        md: {
            color: 'text',
            fontWeight: 'bold',
            fontFamily: 'body',
            fontSize: 1,
            lineHeight: '21px',
        },
        ml: {
            color: 'text',
            fontWeight: 'bold',
            fontFamily: 'body',
            fontSize: 2,
            lineHeight: '23px',
        },
        xml: {
            color: 'text',
            fontWeight: 'bold',
            fontFamily: 'body',
            fontSize: 3,
            lineHeight: '25px',
        },
        lg: {
            color: 'text',
            fontWeight: 'bold',
            fontFamily: 'body',
            fontSize: 4,
            lineHeight: '34px',
        },
        xlg: {
            color: 'text',
            fontWeight: 'bold',
            fontFamily: 'body',
            fontSize: 5,
        },
        xxlg: {
            color: 'text',
            fontWeight: 'bold',
            fontFamily: 'body',
            fontSize: 6,
        },
    },
    buttons: {
        default: {
            cursor: 'pointer',
            borderRadius: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            border: '1px solid',
            bg: 'transparent',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 0,
            py: 5,
            '&:disabled': {
                color: 'muted',
            },
        },
        ...createCustomButtonTheme('primary'),
        ...createCustomButtonTheme('secondary'),
        ...createCustomButtonTheme('info'),
        ...createCustomButtonTheme('background'),
        ...createCustomButtonTheme('danger'),
    },
    forms: {
        checkbox: {
            opacity: 0,
            position: 'absolute',
            left: 0,
            width: 0,
            height: 0,
        },
        input: {
            fontFamily: 'body',
            fontSize: '1',
            fontWeight: 'bold',
            bg: 'gray.2',
            padding: '20px 16px',
            borderWidth: '1px',
            borderColor: 'transparent',
            borderRadius: '10px',
            '::placeholder': {
                color: 'muted',
            },
            ':focus-visible': {
                outline: 'none',
                borderColor: 'primary',
            },
        },
        textarea: {
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 3,
            bg: 'gray.2',
            resize: 'none',
            border: 'none',
            width: '100%',
            p: 6,
            '::placeholder': {
                color: 'muted',
                fontFamily: 'body',
                fontSize: 3,
            },
            ':focus-visible': {
                outline: 'none',
            },
        },
        textField: {
            variant: 'forms.input',
            padding: '0px',
            flex: '1',
            border: 'none',
            borderRadius: '0px',
            height: '25px',
            lineHeight: '25px',
            ':focus-visible': {
                outline: 'none',
            },
        },
        textFieldLabel: {
            bg: 'gray.2',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '16px 12px',
            borderRadius: '10px',
            borderWidth: '1px',
            borderColor: 'transparent',
            borderStyle: 'solid',
            gap: 2,
            ':focus-within': {
                borderColor: 'primary',
            },
        },
        textFieldLabelError: {
            variant: 'forms.textFieldLabel',
            ':focus-within': {
                borderColor: 'danger',
            },
        },
        textFieldHelperText: {
            marginTop: '8px',
            color: 'muted',
            fontWeight: 'bold',
            fontSize: 0,
        },
        textFieldHelperTextError: {
            variant: 'forms.textFieldHelperText',
            color: 'danger',
            transition: 'color .2s ease-out',
        },
    },
    badges: {},
    alerts: {},
    layout: {
        container: {
            bg: 'white',
            width: 'max-content',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            boxSizing: 'border-box',
            overflowY: 'auto',
        },
        header: {
            bg: 'white',
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            width: '100%',
            px: 4,
            zIndex: 1999,
            maxWidth: 375,
            left: '50%',
            transform: 'translateX(-50%)',
        },
        footer: {
            bg: 'white',
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            px: 4,
            zIndex: 1999,
            maxWidth: 375,
            left: '50%',
            transform: 'translateX(-50%)',
        },
    },
    grids: {
        column: {
            flexDirection: 'column',
        },
        row: {
            flexDirection: 'row',
        },
    },
    letten: {
        full: {
            width: '100%',
            height: '100%',
        },
        backdrop: {
            variant: 'letten.full',
            backgroundColor: 'rgba(21, 21, 21, 0.35)',
            backdropFilter: 'blur(16px)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 2000,
        },
        toast: {
            list: {
                display: 'inline-flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                position: 'fixed',
                bottom: '104px',
                left: 0,
                width: '100%',
                zIndex: 1000,
                gap: 3,
            },
            content: {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                width: '343px',
                borderRadius: '10px',
                backdropFilter: 'blur(16px)',
                background: 'rgba(19, 19, 20, 0.4)',
                color: 'background',
                px: '16px',
                py: '16px',
                mx: 'auto',
            },
        },
        textField: {
            bg: 'gray.2',
            color: 'gray.1',
            display: 'flex',
            alignItems: 'center',
            lineHeight: '16px',
            borderRadius: 10,
        },
        textFieldActive: {
            variant: 'letten.textField',
            color: 'black',
        },
        drawer: {
            content: {
                zIndex: 2001,
                width: 'max-content',
                left: '50%',
                display: 'inline-flex',
                flexDirection: 'column',
                transform: 'translateX(-50%) translateY(100%)',
                bottom: '0px',
                position: 'absolute',
                boxShadow: '0px -8px 16px rgba(0, 0, 0, 0.1)',
                borderRadius: '20px 20px 0px 0px',
                padding: '28px 16px',
                bg: 'white',
            },
        },
        dialog: {
            content: {
                position: 'absolute',
                display: 'inline-flex',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: 2001,
                justifyContent: 'center',
                p: 5,
            },
            top: {
                variant: 'letten.dialog.content',
                alignItems: 'flex-start',
            },
            middle: {
                variant: 'letten.dialog.content',
                alignItems: 'center',
            },
            bottom: {
                variant: 'letten.dialog.content',
                alignItems: 'flex-end',
            },
        },
        popover: {
            content: {
                bg: 'white',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
            },
        },
    },
    fontSizes: [11, 13, 15, 17, 22, 25, 30, 34],
    sizes: {
        'max-content': '375px',
    },
    shadows: [
        'rgba(0, 0, 0, 0.1) 0px 4px 12px;',
        'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;',
    ],
    breakpoints: ['@media (min-width: 300px) and (max-width: 768px)', '@media (min-width: 769px)'],
    config: {
        useCustomProperties: true,
    },
};

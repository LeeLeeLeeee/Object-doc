import { COLOR_GUARD, TEXT_GUARD } from '@/theme';
import React from 'react';
import { Text, TextProps } from 'theme-ui';

interface Props extends Omit<TextProps, 'variant'> {
    $color?: COLOR_GUARD;
    $variant?: TEXT_GUARD;
}

const LTTextForwardRef = React.forwardRef((props: Props, ref: any) => {
    const { $color, $variant = 'md', sx, ...rest } = props;
    return <Text ref={ref} sx={{ color: $color, ...sx }} variant={$variant} {...rest} />;
});

export const LTText = React.memo(LTTextForwardRef);

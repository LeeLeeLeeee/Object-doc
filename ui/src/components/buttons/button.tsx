import { COLOR_GUARD, VARIANT_GUARD } from 'theme';
import React, { DOMAttributes } from 'react';
import { Button, ButtonProps } from 'theme-ui';

interface Props extends DOMAttributes<HTMLButtonElement>, ButtonProps {
    $color?: COLOR_GUARD;
    $variant?: VARIANT_GUARD;
}

export const LTButton = React.forwardRef((props: Props, ref: any) => {
    const { $color = 'primary', $variant = 'outlined', ...rest } = props;
    return <Button ref={ref} type="button" variant={`${$color}.${$variant}`} {...rest} />;
});

LTButton.displayName = 'LTButton';

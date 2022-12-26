import React, { ReactElement } from 'react';
import { ExtendChildren } from 'types/common';

interface Props extends ExtendChildren {
    isWrapped: boolean;
    onWrap: (children: React.ReactNode) => ReactElement;
    onWrapFalse?: (children: React.ReactNode) => ReactElement;
}

const ConditionalWrapper = (props: Props): ReactElement<any, any> | null => {
    const { isWrapped, onWrap, onWrapFalse, children } = props;

    if (isWrapped) {
        return onWrap(children);
    }
    return typeof onWrapFalse === 'function' ? onWrapFalse(children) : (children as ReactElement | null);
};

export default React.memo(
    ConditionalWrapper,
    (prevProps, nextProps) => prevProps.isWrapped === nextProps.isWrapped
) as typeof ConditionalWrapper;

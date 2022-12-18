import styled from '@emotion/styled';
import { Box, BoxProps, Flex, FlexProps } from 'theme-ui';
import React, { CSSProperties, HTMLAttributes } from 'react';

type FlexStyleProps = Pick<CSSProperties, 'justifyContent' | 'alignItems' | 'alignSelf'>;

type Props = FlexProps & FlexStyleProps;

const LTFlex = styled(Flex)<FlexStyleProps>`
    box-sizing: border-box;
    align-items: ${(props) => props.alignItems};
    align-self: ${(props) => props.alignSelf};
    justify-content: ${(props) => props.justifyContent};
`;

export const Row = React.forwardRef((props: Props, ref: any) => {
    const { justifyContent = 'center', alignItems = 'center', alignSelf = 'auto', style, ...rest } = props;
    return (
        <LTFlex
            ref={ref}
            style={{
                alignItems,
                alignSelf,
                justifyContent,
                ...style,
            }}
            variant="grids.row"
            {...rest}
        />
    );
});
Row.displayName = 'Row';

export const Column = React.forwardRef((props: Props, ref: any) => {
    const { justifyContent = 'center', alignItems = 'center', alignSelf = 'auto', style, ...rest } = props;

    return (
        <LTFlex
            ref={ref}
            style={{
                alignItems,
                alignSelf,
                justifyContent,
                ...style,
            }}
            variant="grids.column"
            {...rest}
        />
    );
});

Column.displayName = 'Column';
interface ItemProps extends HTMLAttributes<HTMLDivElement>, BoxProps {
    flex?: number;
}

const FlexItemBase = styled(Box)<ItemProps>`
    box-sizing: border-box;
    flex: ${(props) => props.flex};
`;

export function FlexItem(props: ItemProps) {
    const { flex = 1, ...rest } = props;
    return <FlexItemBase flex={flex} {...rest} />;
}

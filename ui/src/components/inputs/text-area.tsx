/* eslint-disable react/jsx-one-expression-per-line */
import styled from '@emotion/styled';
import React from 'react';
import { Textarea, TextareaProps } from 'theme-ui';
import { Column } from '../flex';
import { LTText } from '../text';

interface Props extends TextareaProps {
    length?: number;
    maxLength?: number;
}

const TextAreaWrapper = styled(Column)`
    position: relative;
    & > span {
        position: absolute;
        bottom: 8px;
        right: 24px;
    }
`;

export const LTTextarea = React.forwardRef(({ rows = 8, length = 0, maxLength = 0, ...rest }: Props, ref: any) => (
    <TextAreaWrapper style={{ width: '100%' }}>
        <Textarea ref={ref} {...rest} rows={rows} />
        {maxLength !== undefined ? (
            <LTText sx={{ color: length > maxLength ? 'danger' : '', zIndex: 999 }}>
                {length}
                <LTText $color="muted">/{maxLength}</LTText>
            </LTText>
        ) : null}
    </TextAreaWrapper>
));

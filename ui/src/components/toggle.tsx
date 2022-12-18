/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction, useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { Row } from './flex';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 30,
};

const ToggleWrapper = styled(Row)`
    display: inline-flex;
    width: 50px;
    height: 32px;
    padding: 3px;
    border-radius: 53px;
    justify-content: flex-end !important;
    background-color: ${(props) => props.theme.colors?.primary};
    & > div {
        width: 26px;
        height: 26px;
        border-radius: 26px;
        background: #ffffff;
        box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
    }
    &.close {
        background-color: ${(props) => props.theme.colors?.gray[0]};
        justify-content: flex-start !important;
    }
`;

export function LTToggle(props: Props) {
    const { isOpen, setIsOpen } = props;
    const handleToggleClick = () => {
        setIsOpen((status: boolean) => !status);
    };
    return (
        <ToggleWrapper className={!isOpen ? 'close' : ''} onClick={handleToggleClick}>
            <motion.div layout transition={spring} />
        </ToggleWrapper>
    );
}

export const useToggle = (defaultValue = false) => {
    const [isOpen, setIsOpen] = useState(defaultValue);

    return {
        isOpen,
        setIsOpen,
    };
};

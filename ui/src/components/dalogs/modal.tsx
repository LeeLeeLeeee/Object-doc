import { useModalDispatch, useModalState } from 'recoils/modal';
import { ExtendChildren } from 'types/common';
import { MouseEventHandler } from 'react';
import confirm from './confirm';
import { LTDialog } from './dialog';

interface Props extends ExtendChildren {
    modalID: string;
    visible?: boolean;
    position?: 'top' | 'middle' | 'bottom';
    handleClose?: () => void;
}

export function LTModal(props: Props) {
    const { modalID, visible, handleClose, position = 'middle', ...rest } = props;
    const { close } = useModalDispatch();
    const { visible: visibleState } = useModalState(modalID);
    const modalVisible = visible !== undefined ? visible : visibleState;

    const handleModalClose: MouseEventHandler<HTMLElement> = (e) => {
        e.stopPropagation();
        if (typeof handleClose === 'function') handleClose();
        close(modalID);
    };

    return <LTDialog isOpen={modalVisible} position={position} onClose={handleModalClose} {...rest} />;
}

LTModal.confirm = confirm;

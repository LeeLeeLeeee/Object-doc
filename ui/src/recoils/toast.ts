/* eslint-disable no-unused-vars */
import { SECOND } from '@/const';
import { ToastGuard, ToastProps, ToastType } from '@/types/common';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const toastState = atom<ToastProps[]>({
    key: 'messageState',
    default: [],
});

const messageAccumulateCount = atom({
    key: 'messageAccumulateCount',
    default: 1,
});

export const useToastState = () => useRecoilValue(toastState);

export const useToastDispatch = () => {
    const setToast = useSetRecoilState(toastState);
    const [count, setCount] = useRecoilState(messageAccumulateCount);

    const close = (toastID: string) => {
        setToast((prevMessages) => [...prevMessages.filter((_toast) => _toast.id !== toastID)]);
    };

    const closeAll = () => {
        setToast([]);
    };

    const open = ({
        content = null,
        duration = SECOND * 3,
        isConfirm = false,
        type = 'none',
    }: Partial<ToastProps>): (() => void) => {
        const messageKey = `message-${count}`;
        setCount((curValue) => curValue + 1);
        const message: ToastProps = {
            id: messageKey,
            content,
            duration,
            isConfirm,
            type,
        };
        setToast((messages) => [...messages, message]);

        const closeTimeoutID = setTimeout(() => {
            close(messageKey);
        }, duration);

        return () => {
            if (type !== 'loading') return;
            clearTimeout(closeTimeoutID);
            close(messageKey);
        };
    };

    const toast: Record<ToastGuard, (props: Partial<ToastProps> | string) => void> = {
        [ToastType.ERROR]: (props) => {
            if (typeof props === 'string') {
                open({ content: props, type: ToastType.ERROR });
                return;
            }
            open({ ...props, type: ToastType.ERROR });
        },
        [ToastType.LOADING]: (props) => {
            if (typeof props === 'string') {
                open({ content: props, type: ToastType.LOADING, duration: SECOND * 1000 });
                return;
            }
            open({ ...props, type: ToastType.LOADING, duration: SECOND * 1000 });
        },
        [ToastType.NONE]: (props) => {
            if (typeof props === 'string') {
                open({ content: props, type: ToastType.NONE });
                return;
            }
            open({ ...props, type: ToastType.NONE });
        },
        [ToastType.SUCCESS]: (props) => {
            if (typeof props === 'string') {
                open({ content: props, type: ToastType.SUCCESS });
                return;
            }
            open({ ...props, type: ToastType.SUCCESS });
        },
        [ToastType.WARNING]: (props) => {
            if (typeof props === 'string') {
                open({ content: props, type: ToastType.WARNING });
                return;
            }
            open({ ...props, type: ToastType.WARNING });
        },
    };

    const confirm: Record<ToastGuard, (props: Partial<ToastProps>) => void> = {
        [ToastType.ERROR]: (props) => {
            if (typeof props === 'string') {
                open({ content: props, type: ToastType.ERROR, isConfirm: true, duration: SECOND * 1000 });
                return;
            }
            open({ ...props, type: ToastType.ERROR, isConfirm: true, duration: SECOND * 1000 });
        },
        [ToastType.LOADING]: (props) => {
            if (typeof props === 'string') {
                open({
                    content: 'props',
                    type: ToastType.LOADING,
                    duration: SECOND * 1000,
                    isConfirm: true,
                });
                return;
            }
            open({
                ...props,
                type: ToastType.LOADING,
                duration: SECOND * 1000,
                isConfirm: true,
            });
        },
        [ToastType.NONE]: (props) => {
            if (typeof props === 'string') {
                open({ content: props, type: ToastType.NONE, isConfirm: true, duration: SECOND * 1000 });
                return;
            }
            open({ ...props, type: ToastType.NONE, isConfirm: true, duration: SECOND * 1000 });
        },
        [ToastType.SUCCESS]: (props) => {
            if (typeof props === 'string') {
                open({ content: props, type: ToastType.SUCCESS, isConfirm: true, duration: SECOND * 1000 });
                return;
            }
            open({ ...props, type: ToastType.SUCCESS, isConfirm: true, duration: SECOND * 1000 });
        },
        [ToastType.WARNING]: (props) => {
            if (typeof props === 'string') {
                open({ content: props, type: ToastType.WARNING, isConfirm: true, duration: SECOND * 1000 });
                return;
            }
            open({ ...props, type: ToastType.WARNING, isConfirm: true, duration: SECOND * 1000 });
        },
    };

    return {
        toast,
        confirm,
        closeAll,
    };
};

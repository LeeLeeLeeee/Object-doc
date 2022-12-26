import { atom, selectorFamily, useRecoilState, useRecoilValue } from 'recoil';

const deepCopyMap = (map: Map<any, any>) => new Map(map);
const deepCopySet = (set: Set<any>) => new Set(Array.from(set));

const modalState = atom({
    key: 'modalState',
    default: new Set<string>(),
});

const modalDataState = atom({
    key: 'modalDataState',
    default: new Map(),
});

const singleModalQuery = selectorFamily({
    key: 'singleModalQuery',
    get:
        (modalID: string) =>
        ({ get }) => {
            const modals = get(modalState);
            const modalData = get(modalDataState);
            const result = {
                visible: modals.has(modalID),
                data: undefined,
            };
            if (modalData.has(modalID)) {
                result.data = modalData.get(modalID);
            }
            return result;
        },
});

export const useModalState = (modalID: string) => useRecoilValue(singleModalQuery(modalID));

export const useModalDispatch = () => {
    const [modal, setModal] = useRecoilState(modalState);
    const [modalData, setModalData] = useRecoilState(modalDataState);

    const closeModal = (modalID: string) => {
        if (!modal.has(modalID)) return;
        modal.delete(modalID);
        setModal(deepCopySet(modal));
    };

    const setDataModal = (modalID: string, data: any) => {
        modalData.set(modalID, data);
        setModalData(deepCopyMap(modalData));
    };

    const clearDataModal = (modalID: string) => {
        modalData.delete(modalID);
        setModalData(deepCopyMap(modalData));
    };

    const openModal = (modalID: string, data?: any) => {
        if (modal.has(modalID)) return;
        modal.add(modalID);
        setModal(deepCopySet(modal));
        if (data) setDataModal(modalID, data);
    };

    const closeAll = () => {
        setModal(new Set());
        setModalData(new Map());
    };

    return {
        close: closeModal,
        open: openModal,
        setData: setDataModal,
        clear: clearDataModal,
        closeAll,
    };
};

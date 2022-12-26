import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { SVGInstance } from 'services/svg';

interface UseCaseSVGStateType {
    instance?: SVGInstance;
}

const svgUseCaseState = atom<UseCaseSVGStateType>({
    key: 'svgUseCaseState',
    default: {},
    dangerouslyAllowMutability: true,
});

export const useSvgUseCaseState = () => useRecoilValue(svgUseCaseState);

export const useSvgUseCaseDispatch = () => {
    const set = useSetRecoilState(svgUseCaseState);

    const load = useCallback(() => {
        set({ instance: new SVGInstance() });
    }, [set]);

    return {
        load,
    };
};

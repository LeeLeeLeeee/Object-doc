import { useEffect, useState } from 'react';

export const useGetAsyncValue = (asyncFunction: () => Promise<any>, depth?: string) => {
    const [value, setValue] = useState([]);

    useEffect(() => {
        (async () => {
            const x = await asyncFunction();
            setValue(x);
        })();
    }, [depth]);

    return value;
};

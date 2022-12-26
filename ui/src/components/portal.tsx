/* eslint-disable react/jsx-no-useless-fragment */
import { ExtendChildren } from 'types/common';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface Props extends ExtendChildren {
    selector?: string;
}

export function Portal({ children, selector = '__next' }: Props) {
    const [element, setElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setElement(document.getElementById(selector));
    }, []);

    if (element == null) {
        return <></>;
    }

    return ReactDOM.createPortal(children, element);
}

import styled from '@emotion/styled';
import React, { ReactNode, useEffect, useLayoutEffect } from 'react';
import { useSvgUseCaseDispatch, useSvgUseCaseState } from 'recoils/use-case';
import { SVGInstance } from 'services/svg';
import { ShapeType } from 'services/svg/shapes/factory';
import { LTButton } from './buttons/button';
import { Column, Row } from './flex';

interface Props {
    instance: SVGInstance;
}

class SvgComponent extends React.PureComponent<Props, any> {
    private readonly element: React.RefObject<HTMLDivElement>;
    constructor(props: Props) {
        super(props);
        this.element = React.createRef();
        this.handleCreateActorClick = this.handleCreateActorClick.bind(this);
    }

    componentDidMount() {
        const { instance } = this.props;
        this.element.current?.append(instance.html());
    }

    private handleCreateActorClick() {
        const { instance } = this.props;
        instance.draw(ShapeType.RECT);
    }

    render(): ReactNode {
        return (
            <Column alignSelf="stretch" sx={{ flex: 1 }}>
                <Row justifyContent="flex-start" alignSelf="stretch" sx={{ p: 1, width: '100%', gap: 1 }}>
                    <LTButton onClick={this.handleCreateActorClick} sx={{ py: 2 }}>
                        액터 추가
                    </LTButton>
                    <LTButton sx={{ py: 2 }}>시나리오 추가</LTButton>
                    <LTButton sx={{ py: 2 }}>시나리오확장 추가</LTButton>
                </Row>
                <div
                    ref={this.element}
                    style={{ overflow: 'hidden', width: '100%', height: '100%', backgroundColor: '#F9F9F9' }}
                />
            </Column>
        );
    }
}

export const SvgContainer = React.memo(() => {
    const { instance } = useSvgUseCaseState();
    const { load } = useSvgUseCaseDispatch();

    useEffect(() => {
        load();
    }, []);

    if (instance instanceof SVGInstance) {
        return <SvgComponent instance={instance} />;
    }

    return null;
});

SvgContainer.displayName = 'SvgContainer';

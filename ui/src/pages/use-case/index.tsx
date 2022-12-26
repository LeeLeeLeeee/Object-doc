import ConditionalWrapper from 'components/conditional-wrapper';
import { Column, Row } from 'components/flex';
import { SvgContainer } from 'components/svg-container';
import { LTText } from 'components/text';
import { useState } from 'react';
import { UseCaseForm } from './elements/use-case-form';

const cases = [
    '시나리오 1',
    '시나리오 2',
    '시나리오 3',
    '시나리오 4',
    '시나리오 5',
    '시나리오 6',
    '시나리오 7',
    '시나리오 8',
    '시나리오 9',
    '시나리오 10',
    '시나리오 11',
    '시나리오 12',
];

function UseCasePage() {
    const [selectedTitle, setSelectedTitle] = useState('시나리오 1');
    const handleCaseClick = (title: string) => () => {
        setSelectedTitle(title);
    };

    return (
        <Row
            justifyContent="flex-start"
            alignItems="flex-start"
            alignSelf="stretch"
            sx={{ flex: 1, py: 6, pr: 6, gap: 4, flexWrap: 'wrap', overflowY: 'auto' }}
        >
            <Column
                alignSelf="stretch"
                justifyContent="flex-start"
                sx={{ width: 200, height: '100%', overflowY: 'auto' }}
            >
                {cases.map((title) => (
                    <ConditionalWrapper
                        key={title}
                        isWrapped={title === selectedTitle}
                        onWrap={(children) => (
                            <Row
                                alignSelf="stretch"
                                sx={{
                                    bg: 'background',
                                }}
                            >
                                {children}
                            </Row>
                        )}
                        onWrapFalse={(children) => (
                            <Row alignSelf="stretch" onClick={handleCaseClick(title)}>
                                {children}
                            </Row>
                        )}
                    >
                        <LTText sx={{ height: 50, lineHeight: '50px' }}>{title}</LTText>
                    </ConditionalWrapper>
                ))}
            </Column>
            <Row alignSelf="stretch" sx={{ flex: 1, gap: 1 }}>
                <UseCaseForm onSave={() => {}} onDelete={() => {}} />
                <Column alignSelf="stretch" sx={{ flex: 1 }}>
                    <SvgContainer />
                </Column>
            </Row>
        </Row>
    );
}

export default UseCasePage;

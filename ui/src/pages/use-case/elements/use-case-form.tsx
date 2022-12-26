import { LTButton } from 'components/buttons/button';
import { Column, Row } from 'components/flex';
import { LTTextField } from 'components/inputs/text-field';
import { LTText } from 'components/text';
import { KeyboardEventHandler, ReactEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
    onSave: () => void;
    onDelete: () => void;
}

const schema = Yup.object().shape({
    title: Yup.string().required().min(5),
    actor: Yup.string().required(),
    scenario: Yup.string(),
    extendScenario: Yup.string(),
});

export function UseCaseForm(props: Props) {
    const { onSave, onDelete } = props;
    const { register } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            actor: '',
            scenario: '',
            extendScenario: '',
        },
    });

    const handleScenarioKeyDown: KeyboardEventHandler<HTMLElement> = (e) => {
        console.log(e);
    };

    return (
        <Column
            alignSelf="stretch"
            sx={{ p: 4, flex: 1, borderRadius: 6, boxShadow: 0, gap: 4 }}
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Column alignItems="flex-start" alignSelf="stretch" sx={{ gap: 1 }}>
                <LTText>유스케이스 명</LTText>
                <LTTextField onClear={() => {}} {...register('title')} />
            </Column>
            <Column alignItems="flex-start" alignSelf="stretch" sx={{ gap: 1 }}>
                <LTText>일차 액터</LTText>
                <LTTextField onClear={() => {}} {...register('actor')} />
            </Column>
            <Column alignItems="flex-start" alignSelf="stretch" sx={{ gap: 1 }}>
                <LTText>성공 시나리오</LTText>
                <LTTextField
                    onKeyDown={handleScenarioKeyDown}
                    {...register('scenario')}
                    placeholder="시나리오 입력 후 Enter"
                    onClear={() => {}}
                />
            </Column>
            <Column alignItems="flex-start" alignSelf="stretch" sx={{ gap: 1 }}>
                <LTText>시나리오 확장</LTText>
                <LTTextField {...register('extendScenario')} onKeyDown={handleScenarioKeyDown} onClear={() => {}} />
            </Column>
            <Row alignSelf="stretch" alignItems="flex-end" sx={{ flex: 1, gap: 2 }}>
                <LTButton onClick={onDelete} $variant="fill" $color="danger" sx={{ flex: 1 }}>
                    삭제
                </LTButton>
                <LTButton onClick={onSave} sx={{ flex: 1 }}>
                    저장
                </LTButton>
            </Row>
        </Column>
    );
}

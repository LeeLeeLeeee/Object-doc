/* eslint-disable @typescript-eslint/no-misused-promises */
import { LTButton } from 'components/buttons/button';
import { Column, Row } from 'components/flex';
import { LTTextField } from 'components/inputs/text-field';
import { LTText } from 'components/text';
import { KeyboardEventHandler, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ConditionalWrapper from 'components/conditional-wrapper';
import { v4 } from 'uuid';

interface SchemaType {
    title: string;
    actor: string;
    scenarios: Scenario[];
    extendedScenarios: ExtendedScenarios[];
}
interface Props {
    onSave: SubmitHandler<SchemaType>;
    onDelete: () => void;
}

const schema = Yup.object().shape({
    title: Yup.string().required().min(5),
    actor: Yup.string().required(),
    scenarios: Yup.array().min(1).required(),
    extendedScenarios: Yup.array().min(0),
});

interface Scenario {
    id: string;
    index: number;
    description: string;
}

interface ExtendedScenarios {
    id: string;
    parent: Scenario;
    value: string;
}

export function UseCaseForm(props: Props) {
    const { onSave, onDelete } = props;
    const {
        register,
        watch,
        setValue,
        trigger,
        getValues,
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<SchemaType>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            actor: '',
            scenarios: [],
            extendedScenarios: [],
        },
    });

    const { fields, append, replace } = useFieldArray({
        control,
        name: 'extendedScenarios',
    });

    const scenarios = watch('scenarios');
    const handleScenarioKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.code === 'Enter') {
            const value = e.currentTarget?.value;
            e.currentTarget.value = '';
            const prevValue = getValues('scenarios');
            setValue(
                'scenarios',
                [
                    ...prevValue,
                    {
                        id: v4(),
                        index: prevValue.length + 1,
                        description: value,
                    },
                ],
                { shouldValidate: true }
            );
        }
    };

    const handleScenarioExceptionCaseClick = (parent: Scenario) => () => {
        append({
            id: v4(),
            parent,
            value: '',
        });
    };

    const handleScenarioRemoveClick = (id: string) => () => {
        const removedScenarios = getValues('scenarios').filter((value) => value.id !== id);
        setValue('scenarios', removedScenarios);
        replace(fields.filter((value) => value.parent.id !== id));
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
                <LTTextField {...register('title')} />
            </Column>
            <Column alignItems="flex-start" alignSelf="stretch" sx={{ gap: 1 }}>
                <LTText>일차 액터</LTText>
                <LTTextField {...register('actor')} />
            </Column>
            <Column alignItems="flex-start" alignSelf="stretch" sx={{ gap: 1 }}>
                <LTText>성공 시나리오</LTText>
                <LTTextField onKeyPress={handleScenarioKeyDown} placeholder="시나리오 입력 후 Enter" />
                <ConditionalWrapper
                    isWrapped={scenarios.length !== 0}
                    onWrap={(children) => (
                        <Column
                            alignSelf="stretch"
                            alignItems="flex-start"
                            sx={{
                                p: 1,
                                borderWidth: '2px 0px',
                                borderStyle: 'solid',
                                borderColor: 'background',
                                gap: 1,
                            }}
                        >
                            {children}
                        </Column>
                    )}
                >
                    {scenarios.map((scenario) => (
                        <Row
                            alignSelf="stretch"
                            alignItems="flex-start"
                            justifyContent="space-between"
                            key={scenario.id}
                            sx={{ gap: 1 }}
                        >
                            <LTText>{`${scenario.index}.`}</LTText>
                            <LTText sx={{ flex: 1 }}>{`${scenario.description}`}</LTText>
                            <Row sx={{ gap: 1 }}>
                                <LTButton onClick={handleScenarioExceptionCaseClick(scenario)} sx={{ py: 2 }}>
                                    조건 추가
                                </LTButton>
                                <LTButton
                                    onClick={handleScenarioRemoveClick(scenario.id)}
                                    $color="danger"
                                    $variant="fill"
                                    sx={{ py: 2 }}
                                >
                                    삭제
                                </LTButton>
                            </Row>
                        </Row>
                    ))}
                </ConditionalWrapper>
            </Column>
            <Column alignItems="flex-start" alignSelf="stretch" sx={{ gap: 1 }}>
                <LTText>시나리오 확장</LTText>
                <ConditionalWrapper
                    isWrapped={fields.length !== 0}
                    onWrap={(children) => (
                        <Column
                            alignSelf="stretch"
                            alignItems="flex-start"
                            sx={{
                                p: 1,
                                borderWidth: '2px 0px',
                                borderStyle: 'solid',
                                borderColor: 'background',
                                gap: 1,
                            }}
                        >
                            {children}
                        </Column>
                    )}
                >
                    {fields.map((field, index) => (
                        <Row alignSelf="stretch" justifyContent="space-between" key={field.id} sx={{ gap: 1 }}>
                            <LTText $color="primary">{`${field.parent.index}.`}</LTText>
                            <LTTextField {...register(`extendedScenarios.${index}.value` as const)} sx={{ py: 2 }} />
                            <Row sx={{ gap: 1 }}>
                                <LTButton $color="danger" $variant="fill" sx={{ py: 2, whiteSpace: 'nowrap' }}>
                                    삭제
                                </LTButton>
                            </Row>
                        </Row>
                    ))}
                </ConditionalWrapper>
            </Column>
            <Row alignSelf="stretch" alignItems="flex-end" sx={{ flex: 1, gap: 2 }}>
                <LTButton disabled={!isValid} onClick={handleSubmit(onSave)} sx={{ flex: 1 }}>
                    저장
                </LTButton>
                <LTButton onClick={onDelete} $variant="fill" $color="danger" sx={{ flex: 1 }}>
                    삭제
                </LTButton>
            </Row>
        </Column>
    );
}

export type { SchemaType as UseCaseFormSchema };

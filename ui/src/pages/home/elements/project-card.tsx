import { Column } from 'components/flex';
import { LTText } from 'components/text';
import { ProjectType } from '..';

interface Props extends ProjectType {}

export function ProjectCard(props: Props) {
    return (
        <Column
            alignItems="flex-start"
            justifyContent="flex-start"
            sx={{ width: 300, height: 240, boxShadow: 1, borderRadius: 6, p: 4 }}
        >
            <LTText>{props.title}</LTText>
        </Column>
    );
}

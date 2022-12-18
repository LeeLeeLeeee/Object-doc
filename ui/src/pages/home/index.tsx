import { Row } from 'components/flex';
import { ProjectCard } from './elements/project-card';

const datas = [
    { title: 'project-1', object: { count: 5 }, domain: { count: 3 }, case: { count: 10 } },
    { title: 'project-2', object: { count: 5 }, domain: { count: 3 }, case: { count: 10 } },
    { title: 'project-3', object: { count: 5 }, domain: { count: 3 }, case: { count: 10 } },
    { title: 'project-4', object: { count: 5 }, domain: { count: 3 }, case: { count: 10 } },
    { title: 'project-5', object: { count: 5 }, domain: { count: 3 }, case: { count: 10 } },
    { title: 'project-6', object: { count: 5 }, domain: { count: 3 }, case: { count: 10 } },
    { title: 'project-7', object: { count: 5 }, domain: { count: 3 }, case: { count: 10 } },
    { title: 'project-8', object: { count: 5 }, domain: { count: 3 }, case: { count: 10 } },
    { title: 'project-9', object: { count: 5 }, domain: { count: 3 }, case: { count: 10 } },
    { title: 'project-10', object: { count: 5 }, domain: { count: 3 }, case: { count: 10 } },
    { title: 'project-11', object: { count: 5 }, domain: { count: 3 }, case: { count: 10 } },
];
export type ProjectType = typeof datas extends Array<infer T> ? T : unknown;

function HomePage() {
    return (
        <Row
            justifyContent="flex-start"
            alignItems="flex-start"
            alignSelf="stretch"
            sx={{ flex: 1, p: 6, gap: 4, flexWrap: 'wrap', overflowY: 'auto' }}
        >
            {datas.map((data) => (
                <ProjectCard key={data.title} {...data} />
            ))}
        </Row>
    );
}

export default HomePage;

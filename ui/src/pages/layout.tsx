import { Row } from 'components/flex';
import { SideNavigation } from 'components/side-navigation';
import { Outlet } from 'react-router';

export function Layout() {
    return (
        <Row
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ width: '100%', backgroundColor: 'background', height: 'calc(100% - 48px)', my: 6 }}
        >
            <SideNavigation />
            <Row
                alignSelf="stretch"
                sx={{
                    mr: 6,
                    flex: 1,
                    height: '100%',
                    backgroundColor: 'white',
                    boxShadow: 0,
                    borderRadius: 6,
                }}
            >
                <Outlet />
            </Row>
        </Row>
    );
}

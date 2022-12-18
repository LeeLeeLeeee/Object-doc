import { PATH } from 'const';
import { Path, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { PathGuard } from 'types/common';
import { ConditionalWrapper } from './conditional-wrapper';
import { Column } from './flex';
import { LTText } from './text';

/** @jsxImportSource theme-ui */
export function SideNavigation() {
    const location = useLocation();

    return (
        <Column justifyContent="flex-start" sx={{ mx: 3, width: '200px', mt: 6 }}>
            {Object.keys(PATH).map((key: string) => (
                <ConditionalWrapper
                    key={key}
                    isWrapped={PATH[key as PathGuard].to !== location.pathname.slice(1)}
                    onWrap={(children) => (
                        <Link style={{ width: '100%', textDecoration: 'none' }} to={PATH[key as PathGuard].to}>
                            {children}
                        </Link>
                    )}
                >
                    <LTText
                        sx={{
                            width: '100%',
                            display: 'block',
                            height: 50,
                            lineHeight: '50px',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor:
                                PATH[key as PathGuard].to === location.pathname.slice(1) ? 'primary' : 'transparent',
                            px: 6,
                            borderRadius: 6,
                        }}
                        $variant="ml"
                    >
                        {PATH[key as PathGuard].name}
                    </LTText>
                </ConditionalWrapper>
            ))}
        </Column>
    );
}

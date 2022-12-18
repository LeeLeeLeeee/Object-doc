import { PATH } from 'const';
import DomainModelPage from 'pages/domain-model';
import { Page404 } from 'pages/errors/404';
import HomePage from 'pages/home';
import { Layout } from 'pages/layout';
import ObjectDiagramPage from 'pages/obeject-diagram';
import UseCasePage from 'pages/use-case';
import { Route, Routes } from 'react-router';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'theme-ui';
import { LTBackdrop, registerBackdrop } from './components/backdrop';
import { ToastList } from './components/toasts/toast-list';
import { theme } from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path={PATH.USE_CASE.to} element={<UseCasePage />} />
                        <Route path={PATH.DOMAIN.to} element={<DomainModelPage />} />
                        <Route path={PATH.OBJECT.to} element={<ObjectDiagramPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>
                <LTBackdrop ref={registerBackdrop} />
                <ToastList />
            </RecoilRoot>
        </ThemeProvider>
    );
}

export default App;

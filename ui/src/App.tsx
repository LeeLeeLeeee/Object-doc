import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'theme-ui';
import { LTBackdrop, registerBackdrop } from './components/backdrop';
import { ToastList } from './components/toasts/toast-list';
import { theme } from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <div data-id="aaa">aaa</div>
                <LTBackdrop ref={registerBackdrop} />
                <ToastList />
            </RecoilRoot>
        </ThemeProvider>
    );
}

export default App;

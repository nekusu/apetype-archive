import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTheme } from '../../slices/app';

interface Props {
  children: React.ReactNode;
}

function Provider({ children }: Props) {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(({ app }) => app);
  const { themeName } = useAppSelector(({ config }) => config);

  useEffect(() => {
    (async () => {
      dispatch(setTheme((await import(`../../themes/${themeName}.ts`)).default));
    })();
  }, [dispatch, themeName]);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default Provider;

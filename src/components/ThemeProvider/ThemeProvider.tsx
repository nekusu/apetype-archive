import { ThemeProvider } from 'styled-components';
import { useAppSelector } from '../../app/hooks';

interface Props {
  children: React.ReactNode;
}

function Provider({ children }: Props) {
  const { theme } = useAppSelector(({ config }) => config);

  return (
    <ThemeProvider theme={theme.colors}>
      {children}
    </ThemeProvider>
  );
}

export default Provider;

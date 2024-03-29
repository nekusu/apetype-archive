import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamily: string;
    bg: string;
    main: string;
    caret: string;
    sub: string;
    subAlt: string;
    text: string;
    error: string;
    errorExtra: string;
    colorfulError: string;
    colorfulErrorExtra: string;
  }
}

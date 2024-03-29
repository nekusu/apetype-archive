import { m } from 'framer-motion';
import styled from 'styled-components';
import { Button } from '../../components/ui';

const TypingTest = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
})) <{ $fontSize: ApeTypes.Config['fontSize']; }>`
  height: ${p => (p.$fontSize * 16 + 6) * 4 + 8}px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  font-size: ${p => p.$fontSize * 16}px;
  line-height: ${p => p.$fontSize * 16}px;
  user-select: none;
`;

const Input = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
`;

const OutOfFocus = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}))`
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 16px;
  color: ${p => p.theme.text};
  pointer-events: none;
  transition-property: color;
`;

const CapsLock = styled(Button).attrs(() => ({
  active: true,
}))`
  width: fit-content;
  margin-inline: auto;
  padding: 12px 14px;
  position: absolute;
  top: -106px;
  left: 0;
  right: 0;
`;

const Wrapper = styled.div<{ $blurred: boolean; }>`
  padding: 4px 2px;
  position: relative;
  flex: 1 1;
  opacity: ${p => p.$blurred ? '0.4' : '1'};
  filter: ${p => p.$blurred ? 'blur(5px)' : 'none'};
  cursor: ${p => p.$blurred ? 'pointer' : 'auto'};
  overflow: hidden;
  transition: opacity 0.4s, filter 0.4s;
`;

const Caret = styled(m.div) <{ $style: string; }>`
  height: ${p => p.$style === 'underline' ? '0.125em' : 'calc(1.2em + 6px)'};
  width: ${p => p.$style === 'default' ? 0.125 : 0.7}em;
  margin-top: ${p => p.$style === 'underline' ? 'calc(1em + 6px)' : 0};
  position: absolute;
  border-radius: 0.1em;
  background-color: ${p => p.$style !== 'outline' ? p.theme.caret : 'transparent'};
  border: ${p => p.$style === 'outline' ? '2px solid ' + p.theme.caret : 'none'};
  transition-property: background-color, border-color;
`;

const Words = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const Word = styled.div<{ $error: boolean; }>`
  margin-block: 2px;
  display: flex;
  border-bottom: 2px solid ${p => p.$error ? p.theme.colorfulError : 'transparent'};
  transition: border-color 0.1s ease-out;
`;

const Letter = styled.span<{
  $flipColors: boolean;
  $colorful: boolean;
  $status: ApeTypes.Letter['status'];
  $hidden: boolean;
}>`
  width: ${p => p.$hidden ? 0 : 'auto'};
  position: relative;
  display: inline-block;
  visibility: ${p => p.$hidden ? 'hidden' : 'visible'};
  color: ${p => {
    const { main, sub, text, error, errorExtra, colorfulError, colorfulErrorExtra } = p.theme;
    switch (p.$status) {
      case 'correct':
        if (p.$flipColors) return sub;
        return p.$colorful ? main : text;
      case 'incorrect':
        return p.$colorful ? colorfulError : error;
      case 'extra':
        return p.$colorful ? colorfulErrorExtra : errorExtra;
      default:
        if (p.$flipColors) return p.$colorful ? main : text;
        return sub;
    }
  }};
  transition: color 0.1s ease-out;
`;

const Typo = styled.span`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  top: 90%;
  left: 0;
  font-size: 0.75em;
  color: ${p => p.theme.text};
  opacity: 0.5;
  transition: color 0.1s ease-out;
`;

const Styled = {
  TypingTest,
  Input,
  OutOfFocus,
  CapsLock,
  Wrapper,
  Caret,
  Words,
  Word,
  Letter,
  Typo,
};

export default Styled;

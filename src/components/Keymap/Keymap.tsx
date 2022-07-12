import { useState } from 'react';
import useEventListener from 'use-typed-event-listener';
import Styled from './Keymap.styles';

function Keymap() {
  const [keys, setKeys] = useState(chars.map((char) => ({ char, isActive: false })));
  const toggleActive = (e: KeyboardEvent) => {
    const keyIndex = keys.findIndex((k) => [...k.char].includes(e.key));
    if (keyIndex === -1) return;
    const newKeys = [...keys];
    newKeys[keyIndex].isActive = e.type === 'keydown';
    setKeys(newKeys);
  };

  useEventListener(window, 'keydown', toggleActive);
  useEventListener(window, 'keyup', toggleActive);

  return (
    <Styled.Keymap>
      <Styled.Row>
        {keys.slice(0, 12).map(({ char, isActive }) => (
          <Styled.Key key={char} $active={isActive} />
        ))}
      </Styled.Row>
      <Styled.Row>
        {keys.slice(12, 23).map(({ char, isActive }) => (
          <Styled.Key key={char} $active={isActive} />
        ))}
      </Styled.Row>
      <Styled.Row>
        {keys.slice(23, 33).map(({ char, isActive }) => (
          <Styled.Key key={char} $active={isActive} />
        ))}
      </Styled.Row>
      <Styled.Spacebar key={'space'} $active={!!keys.at(-1)?.isActive} />
    </Styled.Keymap>
  );
}

const chars = [
  'Qq', 'Ww', 'Ee', 'Rr', 'Tt', 'Yy', 'Uu', 'Ii', 'Oo', 'Pp', '[{', '}]',
  'Aa', 'Ss', 'Dd', 'Ff', 'Gg', 'Hh', 'Jj', 'Kk', 'Ll', ';:', '"\'',
  'Zz', 'Xx', 'Cc', 'Vv', 'Bb', 'Nn', 'Mm', ',<', '.>', '/?',
  ' ',
];

export default Keymap;

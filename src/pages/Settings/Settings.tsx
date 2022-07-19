import { useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Setting } from '../../components';
import { Button, Key } from '../../components/ui';
import configList from '../../config/_list';
import Styled from './Settings.styles';

function Settings() {
  const { quickRestart, keyTips } = useAppSelector(({ config }) => config);
  const list = useRef<HTMLDivElement>(null);
  const scrollToCategory = (index: number) => {
    list.current?.children[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <Styled.Settings>
      <Styled.Wrapper>
        <div style={{ display: keyTips === 'show' ? 'block' : 'none' }}>
          pro tip: you can also change all these
          settings quickly using the command line
          (<Key>{quickRestart !== 'esc' ? 'esc' : 'tab'}</Key>)
        </div>
        <Styled.NavButtons>
          {categories.map((cat, index) => (
            <Button key={cat} text onClick={() => scrollToCategory(index)}>
              {cat}
            </Button>
          ))}
        </Styled.NavButtons>
        <Styled.List ref={list}>
          {categories.map((cat) => (
            <Styled.Group key={cat}>
              <Styled.Title $danger={cat === 'danger zone'}>{cat}</Styled.Title>
              {configItems
                .filter(([, config]) => config.category === cat)
                .map(([name]) => (
                  <Setting
                    key={name}
                    name={name}
                    commandLine={commandLineNames.includes(name)}
                    buttonRows={name === 'soundOnClick' ? 2 :
                      name === 'randomTheme' || name === 'keymapStyle' || name === 'keymapLegendStyle'
                        ? 1 : 0}
                  />
                ))}
            </Styled.Group>
          ))}
        </Styled.List>
      </Styled.Wrapper>
    </Styled.Settings>
  );
}

const configItems = Object.entries(configList);
const categories = [
  'behavior',
  'input',
  'sound',
  'caret',
  'appearance',
  'theme',
  'hide elements',
  'danger zone',
];
const commandLineNames = [
  'themeName',
  'language',
  'fontFamily',
  'keymapLayout',
];

export default Settings;

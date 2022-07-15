import { useRef } from 'react';
import { Setting } from '../../components';
import { Button, Key } from '../../components/ui';
import configList from '../../config/_list';
import Styled from './Settings.styles';

function Settings() {
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
        <div>
          pro tip: you can also change all these
          settings quickly using the command line (<Key>esc</Key>)
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
];

export default Settings;

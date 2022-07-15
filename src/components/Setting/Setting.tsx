import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCommandLine } from '../../slices/app';
import { Button } from '../ui';
import configList from '../../config/_list';
import Styled from './Setting.styles';

interface Props {
  name: string;
  commandLine: boolean;
}

function Setting({ name, commandLine }: Props) {
  const dispatch = useAppDispatch();
  const config = useAppSelector(({ config }) => config);
  const configValue = config[name as keyof typeof config];
  const setting = configList[name];

  return (
    <Styled.Setting>
      <Styled.Title>
        {setting.command}
      </Styled.Title>
      <Styled.Description>
        {setting.description}
      </Styled.Description>
      <Styled.Buttons>
        {commandLine
          ? <Button onClick={() => dispatch(setCommandLine({
            isOpen: true,
            initial: name,
          }))}>
            select
          </Button>
          : setting.options.map((option) => (
            <Button
              key={option}
              active={configValue === option}
              onClick={() => dispatch(setting.action(option))}
            >
              {option}
            </Button>
          ))
        }
      </Styled.Buttons>
    </Styled.Setting>
  );
}

export default Setting;

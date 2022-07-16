import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCommandLine } from '../../slices/app';
import { Button } from '../ui';
import configList from '../../config/_list';
import Styled from './Setting.styles';

interface Props {
  name: string;
  commandLine: boolean;
  buttonRows: number;
}

function Setting({ name, commandLine, buttonRows }: Props) {
  const dispatch = useAppDispatch();
  const config = useAppSelector(({ config }) => config);
  const configValue = config[name as keyof typeof config];
  const setting = configList[name];

  return (
    <Styled.Setting $buttonRows={buttonRows}>
      <Styled.Title>
        {setting.command}
      </Styled.Title>
      <Styled.Description>
        {setting.description}
      </Styled.Description>
      <Styled.Buttons $buttonRows={buttonRows}>
        {commandLine
          ? <Button onClick={() => dispatch(setCommandLine({
            isOpen: true,
            initial: name,
          }))}>
            {configValue}
          </Button>
          : setting.options.map((option, index) => (
            <Button
              key={option}
              active={configValue === option}
              onClick={() => dispatch(setting.action(option))}
            >
              {setting.altOptions?.[index] || option}
            </Button>
          ))
        }
      </Styled.Buttons>
    </Styled.Setting>
  );
}

export default Setting;

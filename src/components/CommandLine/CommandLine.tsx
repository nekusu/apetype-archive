import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useIsPresent } from 'framer-motion';
import { useDebouncedCallback } from 'use-debounce';
import { RiTerminalLine, RiCheckLine, RiSettingsLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTheme, setCommandLine } from '../../slices/app';
import { Button, Popup } from '../ui';
import configList from '../../config/_list';
import Styled from './CommandLine.styles';

function CommandLine() {
  const dispatch = useAppDispatch();
  const { commandLine } = useAppSelector(({ app }) => app);
  const config = useAppSelector(({ config }) => config);
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState(commandLine.initial);
  const [configItems, setConfigItems] = useState(Object.entries(configList));
  const [selectedOptions, setSelectedOptions] = useState(configList[selected]?.options || []);
  const isPresent = useIsPresent();
  const input = useRef<HTMLInputElement>(null);
  const listItem = useRef<HTMLDivElement>(null);
  const selectedValue = config[selected as keyof typeof config];
  const setThemeDebounced = useDebouncedCallback(async (themeName) => {
    if (!isPresent) return;
    dispatch(setTheme((await import(`../../themes/${themeName}.ts`)).default));
  }, 250);
  const hoverItem = (index: number) => {
    if (isUsingKeyboard) return;
    setActiveIndex(index);
  };
  const deleteCommand = async () => {
    setSelected('');
    if (selected !== 'themeName') return;
    setThemeDebounced.cancel();
    dispatch(setTheme((await import(`../../themes/${config.themeName}.ts`)).default));
  };
  const changeConfig = (option: string | number) => {
    input.current?.focus();
    dispatch(configList[selected].action(option));
    setInputValue('');
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const isCustom = !!configItems.find(([key]) => key === selected)?.[1].custom;
    const maxIndex = selected
      ? selectedOptions.length + +isCustom
      : configItems.length;
    if (e.key === 'Tab' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((index) => (index + 1) % maxIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((index) => (index - 1) < 0 ? maxIndex - 1 : index - 1);
    } else if (e.key === 'Backspace' && !inputValue) {
      deleteCommand();
    } else if (e.key === 'Enter') {
      listItem.current?.click();
    }
    setIsUsingKeyboard(true);
  };

  useLayoutEffect(() => {
    const value = inputValue.replace(/[^a-zA-Z0-9\s_-]+/gi, '');
    const trimmedValue = value.trim();
    const regex = new RegExp(trimmedValue, 'gi');
    if (selected) {
      const selectedOptions = configList[selected].options
        .filter((option) => option.toString().match(regex))
        .sort((a, b) => a.toString().search(regex) - b.toString().search(regex));
      const selectedindex = selectedOptions
        .reduce((index: number, option, currentIndex) => {
          return selectedValue === option ? currentIndex : index;
        }, 0);
      setSelectedOptions(selectedOptions);
      setActiveIndex(trimmedValue ? 0 : selectedindex);
    } else {
      const configItems = Object.entries(configList)
        .filter(([, { command }]) => command.match(regex))
        .sort(([, a], [, b]) => a.command.search(regex) - b.command.search(regex));
      if (value.endsWith(' ')) {
        const item = configItems.find(([, { command }]) => command === trimmedValue);
        if (configItems.length === 1 || item) {
          listItem.current?.click();
        }
      }
      setConfigItems(configItems);
      setActiveIndex(0);
    }
  }, [inputValue, selected, selectedValue]);
  useLayoutEffect(() => {
    input.current?.focus();
    setInputValue('');
  }, [selected]);
  useEffect(() => {
    if (selected === 'themeName' && listItem.current) {
      const themeName = listItem.current.innerText;
      setThemeDebounced(themeName);
    }
  }, [activeIndex, selected, selectedOptions, setThemeDebounced]);
  useEffect(() => {
    listItem.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activeIndex]);
  useEffect(() => {
    if (selected === 'themeName' && !isPresent) {
      (async () => {
        dispatch(setTheme((await import(`../../themes/${config.themeName}.ts`)).default));
      })();
    }
  }, [dispatch, config.themeName, selected, isPresent]);

  return (
    <Popup top maxWidth={700} close={() => dispatch(setCommandLine({ isOpen: false }))}>
      <Styled.SearchBar onKeyDown={handleKeyDown}>
        <RiTerminalLine />
        {selected && (
          <Styled.Command onClick={() => deleteCommand()}>
            {configList[selected].command}
          </Styled.Command>
        )}
        <Styled.Input
          ref={input}
          placeholder={selected ? 'type value' : 'type command'}
          value={inputValue}
          onChange={({ target: { value } }) => setInputValue(value)}
          autoFocus
        />
        <Button text title="Settings" navigate="/settings">
          <RiSettingsLine />
        </Button>
      </Styled.SearchBar>
      <Styled.List onMouseMove={() => setIsUsingKeyboard(false)}>
        {selected
          ? <>
            {selectedOptions.map((option, index) => (
              <Styled.Item
                key={option}
                ref={index === activeIndex ? listItem : null}
                onMouseOver={() => hoverItem(index)}
                onClick={() => changeConfig(option)}
                $active={index === activeIndex}
                $selected={selectedValue === option}
              >
                {option}
                <RiCheckLine />
              </Styled.Item>
            ))}
            {configList[selected].custom && (
              <Styled.Item
                key="custom"
                ref={selectedOptions.length === activeIndex ? listItem : null}
                onMouseOver={() => hoverItem(selectedOptions.length)}
                onClick={() => changeConfig(inputValue)}
                $active={selectedOptions.length === activeIndex}
                $selected={!configList[selected].options?.includes(selectedValue)}
              >
                custom
                <span>{selectedValue}</span>
              </Styled.Item>
            )}
          </>
          : configItems.map(([key, value], index) => (
            <Styled.Item
              key={key}
              ref={index === activeIndex ? listItem : null}
              onMouseOver={() => hoverItem(index)}
              onClick={() => setSelected(key)}
              $active={index === activeIndex}
            >
              {value.command}
            </Styled.Item>
          ))
        }
      </Styled.List>
    </Popup>
  );
}

export default CommandLine;

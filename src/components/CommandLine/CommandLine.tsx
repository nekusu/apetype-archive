import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useIsPresent } from 'framer-motion';
import { useDebouncedCallback } from 'use-debounce';
import {
  RiTerminalLine,
  RiCheckLine,
  RiSettingsLine,
  RiStarLine,
  RiStarFill,
} from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTheme, setCommandLine } from '../../slices/app';
import { addFavoriteTheme, removeFavoriteTheme } from '../../slices/config';
import { Button, Key, Popup } from '../ui';
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
  const list = useRef<HTMLDivElement>(null);
  const selectedValue = config[selected as keyof Omit<typeof config, 'favoriteThemes'>];
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
    }
    setIsUsingKeyboard(true);
  };
  const selectCommand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (list.current?.children[activeIndex] as HTMLDivElement)?.click();
  };

  useLayoutEffect(() => {
    const value = filterValue(inputValue);
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
          (list.current?.children[0] as HTMLDivElement)?.click();
        }
      }
      setConfigItems(configItems);
      setActiveIndex(0);
    }
  }, [inputValue, selected, selectedValue]);
  useLayoutEffect(() => {
    input.current?.focus();
    setIsUsingKeyboard(true);
    setInputValue('');
  }, [selected]);
  useEffect(() => {
    if (selected === 'themeName' && selectedOptions.length) {
      const themeName = selectedOptions[activeIndex];
      setThemeDebounced(themeName);
    }
  }, [activeIndex, selected, selectedOptions, setThemeDebounced]);
  useEffect(() => {
    (list.current?.children[activeIndex] as HTMLDivElement)
      ?.scrollIntoView({ block: 'nearest' });
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
        <form onSubmit={selectCommand}>
          <Styled.Input
            ref={input}
            placeholder={selected ? 'type value' : 'type command'}
            value={inputValue}
            onChange={({ target: { value } }) => setInputValue(value)}
            autoFocus
          />
        </form>
        <Button
          text
          title="Settings"
          onClick={() => dispatch(setCommandLine({ isOpen: false }))}
          navigate="/settings"
        >
          <RiSettingsLine />
        </Button>
      </Styled.SearchBar>
      <Styled.List ref={list} onMouseMove={() => setIsUsingKeyboard(false)}>
        {selected
          ? <>
            {selectedOptions.map((option, index) => (
              <Styled.Item
                key={option}
                onMouseOver={() => hoverItem(index)}
                onClick={() => changeConfig(option)}
                style={{ fontFamily: selected === 'fontFamily' ? option.toString() : undefined }}
                $active={index === activeIndex}
                $selected={selectedValue === option}
              >
                {option}
                {selectedValue === option && <RiCheckLine />}
                {selected === 'themeName' && (config.favoriteThemes.includes(option as string) && (
                  <span onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeFavoriteTheme(option as string));
                  }}>
                    <RiStarFill />
                  </span>
                ) || activeIndex === index && (
                  <span onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addFavoriteTheme(option as string));
                  }}>
                    <RiStarLine />
                  </span>
                ))}
              </Styled.Item>
            ))}
            {configList[selected].custom && (
              <Styled.Item
                key="custom"
                onMouseOver={() => hoverItem(selectedOptions.length)}
                onClick={() => changeConfig(inputValue)}
                $active={selectedOptions.length === activeIndex}
                $selected={!configList[selected].options?.includes(selectedValue)}
              >
                custom
                {!configList[selected].options?.includes(selectedValue) && (
                  <span>{selectedValue}</span>
                )}
              </Styled.Item>
            )}
          </>
          : configItems.map(([key, { command }], index) => (
            <Styled.Item
              key={key}
              onMouseOver={() => hoverItem(index)}
              onClick={() => setSelected(key)}
              $active={index === activeIndex}
            >
              {command}
              {(configItems.length === 1 || filterValue(inputValue) === command) && (
                <Key id="key">space</Key>
              )}
            </Styled.Item>
          ))
        }
      </Styled.List>
    </Popup>
  );
}

const filterValue = (value: string) => {
  return value.replace(/[^a-zA-Z0-9\s-/]+/gi, '');
};

export default CommandLine;

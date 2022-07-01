import React, { useEffect, useRef, useState } from 'react';
import { RiCursorFill } from 'react-icons/ri';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Loading } from '../ui';
import languages from '../../languages/_list';
import { setWords, updateWord, setIsTyping } from './TypingTest.slice';
import Styled from './TypingTest.styles';

function TypingTest() {
  const dispatch = useAppDispatch();
  const { words, isTyping } = useAppSelector(({ typingTest }) => typingTest);
  const [wordIndex, setWordIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(' ');
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });
  const input = useRef<HTMLInputElement>(null);
  const wordsWrapper = useRef<HTMLDivElement>(null);
  const currentWord = useRef<HTMLDivElement>(null);
  const currentLetter = useRef<HTMLSpanElement>(null);
  const blurTimeout = useRef<NodeJS.Timer>();
  const typingTimeout = useRef<NodeJS.Timer>();
  const focusWords = () => {
    clearTimeout(blurTimeout.current);
    input.current?.focus();
    setIsFocused(true);
  };
  const blurWords = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    clearTimeout(blurTimeout.current);
    blurTimeout.current = setTimeout(() => setIsFocused(false), 1000);
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const typed = [...value.trim()];

    dispatch(setIsTyping(true));
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => dispatch(setIsTyping(false)), 1000);
    dispatch(updateWord({ wordIndex, typed }));
    if (!value) {
      if (wordIndex > 0) {
        const previousWord = words[wordIndex - 1].letters
          .reduce((word, letter) => word + (letter.typed || ''), '');
        setInputValue(` ${previousWord}`);
        setWordIndex((index) => index - 1);
      } else {
        setInputValue(' ');
      }
    } else if (value.endsWith(' ')) {
      setInputValue(' ');
      if (value.length > 2) {
        setWordIndex((index) => index + 1);
      }
    } else {
      setInputValue(value);
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', focusWords);
    focusWords();
    (async () => {
      const [defaultLanguage] = languages;
      const reponse = await fetch(languageURL(defaultLanguage));
      const { words } = await reponse.json();
      dispatch(setWords(words));
    })();
  }, [dispatch]);
  useEffect(() => {
    const top = currentWord.current?.offsetTop || 2;
    const left = currentLetter.current
      ? currentLetter.current.offsetLeft + currentLetter.current.offsetWidth + 1
      : currentWord.current
        ? currentWord.current.offsetLeft
        : 0;

    wordsWrapper.current?.scrollTo({ top: top - 44, behavior: 'smooth' });
    setCaretPosition({ top, left });
  }, [inputValue, wordIndex]);

  return (
    <Styled.TypingTest>
      <Styled.Input
        ref={input}
        value={inputValue}
        onChange={handleInput}
        onBlur={blurWords}
      />
      {words.length
        ? <Styled.Wrapper
          ref={wordsWrapper}
          onClick={focusWords}
          $blurred={!isFocused}
        >
          {isFocused && (
            <Styled.Caret
              animate={{
                opacity: [1, isTyping ? 1 : 0, 1],
                top: caretPosition.top,
                left: caretPosition.left,
              }}
            />
          )}
          <Styled.Words>
            {words.map(({ original, typed, isCorrect, letters }, index) => (
              <Styled.Word
                ref={wordIndex === index ? currentWord : null}
                key={original}
                $error={wordIndex > index && !isCorrect}
              >
                {letters.map((letter, i) => (
                  <Styled.Letter
                    ref={wordIndex === index &&
                      ((typed?.length || 0) - 1) === i
                      ? currentLetter
                      : null}
                    key={i}
                    $status={letter.status}
                  >
                    {letter.typed || letter.original}
                  </Styled.Letter>
                ))}
              </Styled.Word>
            ))}
          </Styled.Words>
        </Styled.Wrapper>
        : <Loading />
      }
      {!isFocused && (
        <Styled.OutOfFocus>
          <RiCursorFill />
          Click or press any key to focus
        </Styled.OutOfFocus>
      )}
    </Styled.TypingTest>
  );
}

const languageURL = (lang: string) => `https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/${lang}.json`;

export default TypingTest;

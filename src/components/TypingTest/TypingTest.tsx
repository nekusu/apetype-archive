import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, useIsPresent } from 'framer-motion';
import { RiCursorFill } from 'react-icons/ri';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Loading } from '../ui';
import languages from '../../languages/_list';
import {
  setRawWords,
  setTestWords,
  checkInput,
  setIsReady,
  setIsTyping,
  startTest,
  resetTest,
} from '../../slices/typingTest';
import Styled from './TypingTest.styles';
import shuffleArray from '../../utils/shuffleArray';

function TypingTest() {
  const isPresent = useIsPresent();
  const dispatch = useAppDispatch();
  const { mode, words, language } = useAppSelector(({ config }) => config);
  const {
    rawWords,
    testWords,
    wordIndex,
    inputValue,
    isReady,
    isRunning,
    isTyping,
  } = useAppSelector(({ typingTest }) => typingTest);
  const [isFocused, setIsFocused] = useState(true);
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });
  const input = useRef<HTMLInputElement>(null);
  const wordsWrapper = useRef<HTMLDivElement>(null);
  const currentWord = useRef<HTMLDivElement>(null);
  const currentLetter = useRef<HTMLSpanElement>(null);
  const blurTimeout = useRef<NodeJS.Timer>();
  const typingTimeout = useRef<NodeJS.Timer>();
  const focusWords = (e: KeyboardEvent | React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
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
    if (!isReady) return;
    const { value } = e.target;

    if (!isRunning) {
      dispatch(startTest());
    }

    dispatch(checkInput(value));
    dispatch(setIsTyping(true));
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => dispatch(setIsTyping(false)), 1000);
  };

  useEffect(() => {
    dispatch(resetTest());
    input.current?.focus();
    if (rawWords.length) {
      const shuffledWords = shuffleArray(rawWords as []);
      if (mode === 'words') {
        shuffledWords.splice(words, shuffledWords.length);
      }
      dispatch(setTestWords(shuffledWords));
    } else {
      (async () => {
        const rawWords = await getWords(language);
        dispatch(setRawWords(rawWords));
      })();
    }
  }, [dispatch, mode, words, language, rawWords]);
  useEffect(() => {
    if (!isPresent) dispatch(setIsReady(false));
  }, [dispatch, isPresent]);
  useEffect(() => {
    if (!isFocused) window.addEventListener('keydown', focusWords);
    return () => window.removeEventListener('keydown', focusWords);
  }, [isFocused]);
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
      <AnimatePresence>
        {isReady && (
          <Styled.Wrapper
            key="words-wrapper"
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
              {testWords.map(({ original, typed, isCorrect, letters }, index) => (
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
        )}
        {!rawWords.length && <Loading />}
      </AnimatePresence>
      {isReady && !isFocused && (
        <Styled.OutOfFocus>
          <RiCursorFill />
          Click or press any key to focus
        </Styled.OutOfFocus>
      )}
    </Styled.TypingTest>
  );
}

const languageURL = (lang: string) => `https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/${lang}.json`;
const getWords = async (language: string = languages[0]) => {
  const reponse = await fetch(languageURL(language));
  const { words } = await reponse.json();
  return words;
};

export default TypingTest;

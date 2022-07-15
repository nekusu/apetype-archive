/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, useIsPresent } from 'framer-motion';
import useEventListener from 'use-typed-event-listener';
import { RiCursorFill } from 'react-icons/ri';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addTestWords,
  checkInput,
  setIsReady,
  setIsTyping,
  startTest,
  resetTest,
} from '../../slices/typingTest';
import Styled from './TypingTest.styles';

function TypingTest() {
  const dispatch = useAppDispatch();
  const { commandLine } = useAppSelector(({ app }) => app);
  const config = useAppSelector(({ config }) => config);
  const { mode, words } = config;
  const {
    testLanguage,
    testWords,
    wordIndex,
    inputValue,
    isReady,
    isRunning,
    isTyping,
    isTestPopupOpen,
  } = useAppSelector(({ typingTest }) => typingTest);
  const [isFocused, setIsFocused] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);
  const [caretPosition, setCaretPosition] = useState({ top: 2, left: 0 });
  const isPresent = useIsPresent();
  const input = useRef<HTMLInputElement>(null);
  const wordsWrapper = useRef<HTMLDivElement>(null);
  const currentWord = useRef<HTMLDivElement>(null);
  const currentLetter = useRef<HTMLSpanElement>(null);
  const blurTimeout = useRef<NodeJS.Timer>();
  const typingTimeout = useRef<NodeJS.Timer>();
  const lastCaretTopPosition = useRef(2);
  const generateTestWords = ({ words, characters }: { words?: number, characters: number; }) => {
    const newTestWords = [];
    let totalCharacters = 0;
    while (totalCharacters < characters) {
      if (newTestWords.length === words) break;
      const randomIndex = Math.floor(Math.random() * testLanguage.words.length);
      const word = testLanguage.words[randomIndex];
      newTestWords.push(testLanguage.words[randomIndex]);
      totalCharacters += word.length;
    }
    dispatch(addTestWords(newTestWords));
  };
  const focusWords = () => {
    clearTimeout(blurTimeout.current);
    input.current?.focus();
    setIsFocused(true);
    setIsBlurred(false);
  };
  const blurWords = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    clearTimeout(blurTimeout.current);
    blurTimeout.current = setTimeout(() => setIsBlurred(true), 1000);
    setIsFocused(false);
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab' || e.key === 'Escape' || e.key.match(/F\d*/)) return;
    e.preventDefault();
    focusWords();
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isReady) return;
    const { value } = e.target;
    if (!isRunning) {
      dispatch(startTest(performance.now()));
    }
    dispatch(checkInput({ value, config }));
    dispatch(setIsTyping(true));
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => dispatch(setIsTyping(false)), 1000);
  };

  useEventListener(
    !commandLine.isOpen && !isTestPopupOpen && !isFocused ? window : null,
    'keydown',
    handleKeyDown,
  );
  useEffect(() => {
    dispatch(resetTest());
    if (mode === 'words' && words > 0) {
      generateTestWords({ words, characters: 200 });
    } else if (mode === 'time' || mode === 'words' && !words) {
      generateTestWords({ characters: 200 });
    } else if (mode === 'zen') {
      dispatch(setIsReady(true));
    }
  }, [dispatch]);
  useEffect(() => {
    if (!isPresent) {
      dispatch(setIsReady(false));
    }
  }, [dispatch, isPresent]);
  useEffect(() => {
    if (!commandLine.isOpen && !isTestPopupOpen) {
      focusWords();
    }
  }, [commandLine.isOpen, isTestPopupOpen]);
  useEffect(() => {
    const top = currentWord.current?.offsetTop || 2;
    const left = currentLetter.current
      ? currentLetter.current.offsetLeft + currentLetter.current.offsetWidth + 1
      : currentWord.current?.offsetLeft || 0;
    wordsWrapper.current?.scrollTo({ top: top - 44, behavior: 'smooth' });
    setCaretPosition({ top, left });
  }, [inputValue, wordIndex]);
  useEffect(() => {
    if (caretPosition.top > lastCaretTopPosition.current) {
      lastCaretTopPosition.current = caretPosition.top;
      if (mode === 'words' && words > 0) {
        generateTestWords({ words: words - testWords.length, characters: 80 });
      } else if (mode === 'time' || mode === 'words' && !words) {
        generateTestWords({ characters: 80 });
      }
    }
  }, [testWords, caretPosition.top]);

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
            ref={wordsWrapper}
            onClick={focusWords}
            $blurred={isBlurred}
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
                  ref={wordIndex === index
                    ? currentWord : null}
                  key={`${original}-${index}`}
                  $error={wordIndex > index && !isCorrect}
                >
                  {letters.map((letter, i) => (
                    <Styled.Letter
                      ref={wordIndex === index &&
                        ((typed?.length || 0) - 1) === i
                        ? currentLetter : null}
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
      </AnimatePresence>
      {isReady && isBlurred && (
        <Styled.OutOfFocus>
          <RiCursorFill />
          Click or press any key to focus
        </Styled.OutOfFocus>
      )}
    </Styled.TypingTest>
  );
}

export default TypingTest;

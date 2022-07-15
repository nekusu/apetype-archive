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
  const { mode, words, smoothCaret, caretStyle } = config;
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
  const [caretPosition, setCaretPosition] = useState({ x: 0, y: 0 });
  const isPresent = useIsPresent();
  const input = useRef<HTMLInputElement>(null);
  const currentWord = useRef<HTMLDivElement>(null);
  const currentLetter = useRef<HTMLSpanElement>(null);
  const blurTimeout = useRef<NodeJS.Timer>();
  const typingTimeout = useRef<NodeJS.Timer>();
  const lastCaretTopPosition = useRef(0);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const top = currentWord.current?.offsetTop || 0;
    const left = currentLetter.current
      ? currentLetter.current.offsetLeft + currentLetter.current.offsetWidth + 1
      : currentWord.current?.offsetLeft || 0;
    currentWord.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setCaretPosition({ x: left, y: top });
  }, [inputValue, wordIndex]);
  useEffect(() => {
    if (caretPosition.y > lastCaretTopPosition.current) {
      lastCaretTopPosition.current = caretPosition.y;
      if (mode === 'words' && words > 0) {
        generateTestWords({ words: words - testWords.length, characters: 80 });
      } else if (mode === 'time' || mode === 'words' && !words) {
        generateTestWords({ characters: 80 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testWords, caretPosition.y]);

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
            onClick={focusWords}
            $blurred={isBlurred}
          >
            {isFocused && caretStyle !== 'off' && (
              <Styled.Caret
                animate={{
                  opacity: [1, isTyping ? 1 : 0, 1],
                  top: caretPosition.y,
                  left: caretPosition.x,
                  transition: {
                    opacity: {
                      repeat: Infinity,
                      ease: smoothCaret === 'on' ? 'easeInOut' : [1, -10, 0, 10],
                      duration: 1,
                    },
                    default: {
                      ease: 'easeOut',
                      duration: smoothCaret === 'on' ? 0.1 : 0,
                    },
                  },
                }}
                $style={caretStyle}
              />
            )}
            <Styled.Words>
              {testWords.map(({ original, typed, isCorrect, letters }, index) => (
                <Styled.Word
                  ref={wordIndex === index ? currentWord : null}
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

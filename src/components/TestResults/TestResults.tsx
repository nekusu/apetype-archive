import { useAppSelector } from '../../app/hooks';
import { Chart } from '../index';
import { StatGroup } from '../ui';
import { accuracy as acc, kogasa } from '../../utils';
import Styled from './TestResults.styles';

function TestResults() {
  const {
    mode,
    time,
    words,
    language,
    showDecimalPlaces,
  } = useAppSelector(({ config }) => config);
  const {
    testWords,
    raw,
    wpm,
    characterCount,
    errorCount,
    stats,
    elapsedTime,
  } = useAppSelector(({ typingTest }) => typingTest);
  const intRaw = Math.floor(raw);
  const intWpm = Math.floor(wpm);
  const accuracy = acc(errorCount, characterCount);
  const intAccuracy = Math.floor(accuracy);
  const consistency = kogasa(stats.raw);
  const intConsistency = Math.floor(consistency);
  const characters = testWords.reduce((characters, word) => {
    word.letters.forEach(({ status }) => {
      if (!status) return;
      if (status === 'correct') {
        if (word.isCorrect) {
          characters.correct++;
        }
      } else {
        characters[status]++;
      }
    });
    return characters;
  }, {
    correct: 0,
    incorrect: 0,
    extra: 0,
    missed: 0,
  });

  return (
    <Styled.TestResults>
      <Styled.Stats>
        <StatGroup
          title={{ text: 'wpm', size: 32 }}
          values={[{
            text: `${showDecimalPlaces === 'on' ? +wpm.toFixed(2) : intWpm}`,
            size: 64,
          }]}
        />
        <StatGroup
          title={{ text: 'acc', size: 32 }}
          values={[{
            text: `${showDecimalPlaces === 'on' ? +accuracy.toFixed(2) : intAccuracy}%`,
            size: 64,
          }]}
        />
      </Styled.Stats>
      <Styled.Wrapper>
        <Chart />
      </Styled.Wrapper>
      <Styled.MoreStats>
        <StatGroup
          title={{ text: 'test type' }}
          values={[
            { text: `${mode} ${mode === 'time' ? time : mode === 'words' ? words : ''}` },
            { text: language },
          ]}
        />
        <StatGroup
          title={{ text: 'raw' }}
          values={[{
            text: `${showDecimalPlaces === 'on' ? +raw.toFixed(2) : intRaw}`,
            size: 32,
          }]}
        />
        <StatGroup
          title={{ text: 'characters' }}
          values={[{ text: Object.values(characters).join('/'), size: 32 }]}
        />
        <StatGroup
          title={{ text: 'consistency' }}
          values={[{
            text: `${showDecimalPlaces === 'on' ? +consistency.toFixed(2) : intConsistency}%`,
            size: 32,
          }]}
        />
        <StatGroup
          title={{ text: 'time' }}
          values={[{ text: `${elapsedTime}s`, size: 32 }]}
        />
      </Styled.MoreStats>
    </Styled.TestResults>
  );
}

export default TestResults;

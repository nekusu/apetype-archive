import { useAppSelector } from '../../app/hooks';
import { Chart } from '../index';
import { StatGroup } from '../ui';
import kogasa from '../../utils/kogasa';
import Styled from './TestResults.styles';

function TestResults() {
  const { mode, time, language } = useAppSelector(({ config }) => config);
  const {
    words,
    raw,
    wpm,
    characters: characterCount,
    errors,
    dataset,
    elapsedTime,
  } = useAppSelector(({ typingTest }) => typingTest);
  const accuracy = Math.floor((1 - errors / characterCount) * 100);
  const characters = words.reduce((characters, word) => {
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
  const consistency = Math.floor(kogasa(dataset.raw));

  return (
    <Styled.TestResults>
      <Styled.Stats>
        <StatGroup
          title={{ text: 'wpm', size: 32 }}
          values={[{ text: wpm, size: 64 }]}
        />
        <StatGroup
          title={{ text: 'acc', size: 32 }}
          values={[{ text: `${accuracy}%`, size: 64 }]}
        />
      </Styled.Stats>
      <Styled.Wrapper>
        <Chart />
      </Styled.Wrapper>
      <Styled.MoreStats>
        <StatGroup
          title={{ text: 'test type' }}
          values={[
            { text: `${mode} ${time}` },
            { text: language },
          ]}
        />
        <StatGroup
          title={{ text: 'raw' }}
          values={[{ text: raw, size: 32 }]}
        />
        <StatGroup
          title={{ text: 'characters' }}
          values={[{ text: Object.values(characters).join('/'), size: 32 }]}
        />
        <StatGroup
          title={{ text: 'consistency' }}
          values={[{ text: `${consistency}%`, size: 32 }]}
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

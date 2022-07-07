import Styled from './StatGroup.styles';

interface Props {
  title: {
    text: string | number;
    size?: number;
  },
  values: {
    text: string | number;
    size?: number;
  }[];
}

function StatGroup({ title, values }: Props) {
  return (
    <Styled.Group>
      <Styled.Title $size={title.size}>
        {title.text}
      </Styled.Title>
      {values.map(({ text, size }) => (
        <Styled.Value key={text} $size={size}>
          {text}
        </Styled.Value>
      ))}
    </Styled.Group>
  );
}

export default StatGroup;

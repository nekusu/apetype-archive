import styled from 'styled-components';

const Group = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div <{ $size?: number; }> `
  margin-bottom: 4px;
  font-size: ${p => p.$size || 16}px;
  line-height: ${p => p.$size || 16}px;
  color: ${p => p.theme.sub};
  transition-property: color;
`;

const Value = styled(Title)`
  margin: 0;
  color: ${p => p.theme.main};
  transition-property: color;
`;

const Styled = {
  Group,
  Title,
  Value,
};

export default Styled;

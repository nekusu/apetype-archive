import styled from 'styled-components';

const Key = styled.span`
  padding: 3px 5px;
  margin-inline: 1px;
  display: inline-block;
  font-size: 11px;
  line-height: 11px;
  background-color: ${p => p.theme.sub};
  color: ${p => p.theme.bg};
  border-radius: 4px;
  transition-property: background-color, color;
`;

export default Key;

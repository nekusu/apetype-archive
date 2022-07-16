import styled from 'styled-components';

const Setting = styled.div < { $buttonRows: number; }>`
  display: grid;
  grid-template-columns: ${p => p.$buttonRows ? '1fr' : '2fr 1fr'};
  grid-template-rows: repeat(${p => p.$buttonRows + 2}, auto);
  gap: 6px 20px;
`;

const Title = styled.h3`
  grid-column: 1 / -1;
  font-size: 18px;
  font-weight: normal;
  color: ${p => p.theme.text};
  transition-property: color;
`;

const Description = styled.p`
  font-size: 15px;
  color: ${p => p.theme.sub};
  transition-property: color;
`;

const Buttons = styled.div < { $buttonRows: number; }>`
  margin-top: ${p => p.$buttonRows ? 6 : 0}px;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: repeat(${p => p.$buttonRows}, auto);
  grid-auto-flow: column;
  align-items: center;
  gap: 8px;
`;

const Styled = {
  Setting,
  Title,
  Description,
  Buttons,
};

export default Styled;

import styled from 'styled-components';

const Setting = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
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

const Buttons = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  align-items: center;
  gap: 10px;
`;

const Styled = {
  Setting,
  Title,
  Description,
  Buttons,
};

export default Styled;

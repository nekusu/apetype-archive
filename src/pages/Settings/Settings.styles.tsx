import { m } from 'framer-motion';
import styled from 'styled-components';

const Settings = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  width: 100%;
  position: relative;
  gap: 24px;
  flex: 1 1;
  color: ${p => p.theme.sub};
  cursor: default;
  transition-property: color;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  position: absolute;
  height: 100%;
  gap: 20px;

  >*:first-child {
    grid-column: 1 / -1;
  }
`;

const NavButtons = styled.nav`
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px 20px;
  overflow-x: hidden;
  overflow-y: auto;

  button {
    padding-inline: 0;
  }
`;

const List = styled.div`
  margin-right: -20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Title = styled.h2<{ $danger: boolean; }>`
  font-size: 28px;
  font-weight: normal;
  color: ${p => p.$danger ? p.theme.error : p.theme.main};
  transition-property: color;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Styled = {
  Settings,
  Wrapper,
  NavButtons,
  List,
  Title,
  Group,
};

export default Styled;

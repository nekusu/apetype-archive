import styled from 'styled-components';
import { Button } from '../../components/ui';

const SearchBar = styled.div`
  margin-inline: 8px;
  display: flex;
  align-items: center;
  gap: 14px;

  >svg:first-child {
    margin-left: 7px;
    font-size: 16px;
    color: ${p => p.theme.text};
    transition-property: color;
  }

  form {
    flex: 1 1;
  }
`;

const Command = styled(Button)`
  margin-inline: -5px;
  padding: 6px 10px;
  font-size: 13px;
`;

const Input = styled.input`
  min-width: 0;
  width: 100%;
  padding-block: 14px;
  font-family: inherit;
  font-size: 16px;
  caret-color: ${p => p.theme.caret};
  background-color: transparent;
  color: inherit;
  transition-property: color;
`;

const List = styled.div`
  flex: 1 1;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Item = styled.div<{ $active: boolean; $selected?: boolean; }>`
  height: 36px;
  padding-inline: 16px;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  font-family: inherit;
  background-color: ${p => p.$active && p.$selected ? p.theme.text : p.$active ? p.theme.main : 'transparent'};
  color: ${p => p.$active ? p.theme.bg : p.$selected ? p.theme.text : p.theme.sub};
  cursor: pointer;
  transition-property: background-color, color;
  transition-duration: 0.1s;

  >*:last-child {
    margin-left: 12px;
  }

  #key {
    background-color: ${p => p.theme.subAlt};
    color: ${p => p.theme.text};
  }

  svg {
    font-size: 16px;
  }

  span {
    margin-right: 1px;
    display: flex;
    align-items: center;
  }
`;

const Styled = {
  SearchBar,
  Command,
  Input,
  List,
  Item,
};

export default Styled;

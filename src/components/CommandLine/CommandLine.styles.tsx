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
  }
`;

const Command = styled(Button)`
  margin-inline: -5px;
  padding: 6px 10px;
  font-size: 13px;
`;

const Input = styled.input`
  min-width: 0;
  padding-block: 14px;
  font-family: inherit;
  font-size: 16px;
  caret-color: ${p => p.theme.caret};
  background-color: transparent;
  color: inherit;
  flex: 1 1;
  transition: color 0.25s;
`;

const List = styled.div`
  flex: 1 1;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Item = styled.div<{ $active: boolean; $selected?: boolean; }>`
  height: 36px;
  padding-inline: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: inherit;
  background-color: ${p => p.$active && p.$selected ? p.theme.text : p.$active ? p.theme.main : 'transparent'};
  color: ${p => p.$active ? p.theme.bg : p.$selected ? p.theme.text : p.theme.sub};
  cursor: pointer;
  transition: background-color ${p => p.$active ? 0 : 0.15}s, color ${p => p.$active ? 0 : 0.15}s;

  >*:last-child {
    display: ${p => p.$selected ? 'block' : 'none'};
  }

  svg {
    font-size: 16px;
  }

  span {
    margin-right: 1px;
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

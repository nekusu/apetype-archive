import styled from 'styled-components';

const Keymap = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  gap: 4px;
`;

const Key = styled.div<{ $active: boolean; }>`
  height: 32px;
  width: 32px;
  background-color: ${p => p.$active ? p.theme.main : 'transparent'};
  border: 1px solid ${p => p.theme.sub};
  border-radius: 8px;
  transition: background-color ${p => p.$active ? '0' : '0.25s'}, border-color 0.25s;
`;

const Spacebar = styled(Key)`
  width: 212px;
`;

const Styled = {
  Keymap,
  Row,
  Key,
  Spacebar,
};

export default Styled;

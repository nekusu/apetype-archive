import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  gap: 4px;
`;

const Key = styled.div<{ $active: boolean; }>`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.$active ? p.theme.main : 'transparent'};
  color: ${p => p.$active ? p.theme.bg : p.theme.sub};
  border: 1px solid ${p => p.theme.sub};
  border-radius: 8px;
  user-select: none;
  transition-property: background-color, border-color;
  transition-duration: ${p => p.$active ? '0s' : 'inherit'};
`;

const Keymap = styled.div<{ $split: boolean; }>`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  >${Row} >${Key}:nth-child(5) {
    margin-right: ${p => p.$split ? 36 : 0}px;
  }

  #spacebar {
    width: ${p => p.$split ? 106 : 212}px;

    &:first-child {
      margin-right: ${p => p.$split ? 36 : 0}px;
    }
  }
`;


const Styled = {
  Keymap,
  Row,
  Key,
};

export default Styled;

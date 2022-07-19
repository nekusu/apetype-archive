import { m } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 24px;
  padding-inline: 2px;
  user-select: none;
`;

const TestStats = styled(m.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
})) <{
  $color: ApeTypes.Config['statsColor'];
  $opacity: ApeTypes.Config['statsOpacity'];
}>`
  display: flex;
  gap: 30px;
  font-size: 24px;
  line-height: 24px;
  color: ${p => p.theme[p.$color]};
  transition-property: color;

  >* {
    opacity: ${p => p.$opacity};
  }
`;

const Bar = styled(m.div) <{ $color: ApeTypes.Config['statsColor']; }>`
  height: 8px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${p => p.theme[p.$color]};
`;

const Styled = {
  Wrapper,
  TestStats,
  Bar,
};

export default Styled;

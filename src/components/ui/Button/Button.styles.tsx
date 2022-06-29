import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  active?: boolean;
}

const Button = styled(motion.button).attrs((props) => ({
  type: props.type || 'button',
})) <Props>`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: inherit;
  font-size: 16px;
  background: ${p => p.active ? p.theme.main : p.theme.subAlt};
  color: ${p => p.active ? p.theme.bg : p.theme.text};
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: ${p => p.theme.text};
    color: ${p => p.theme.bg};
  }
`;

const TextButton = styled(Button)`
  && {
    background: transparent;
  }
  color: ${p => p.theme.sub};

  &:hover {
    color: ${p => p.theme.text};
  }
`;

const Styled = {
  Button,
  TextButton,
};

export default Styled;

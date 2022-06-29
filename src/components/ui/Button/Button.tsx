import Styled from './Button.styles';
import { HTMLMotionProps } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Props extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  active?: boolean;
  text?: boolean;
  navigate?: string;
}

function Button({ children, active, text, navigate: to, onClick, ...rest }: Props) {
  const StyledButton = text ? Styled.TextButton : Styled.Button;
  const navigate = useNavigate();

  return (
    <StyledButton
      onClick={(e) => {
        onClick?.(e);
        to && navigate(to);
      }}
      whileTap={{ scale: text ? 1 : 0.925 }}
      transition={{ duration: 0.15 }}
      active={active}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

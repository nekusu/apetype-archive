import React from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from './Button.styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
  text?: boolean;
  alt?: boolean;
  navigate?: string;
  href?: string;
}

function Button({
  children,
  active,
  text,
  alt,
  navigate: to,
  href,
  onClick,
  ...rest
}: Props) {
  const StyledButton = text ? Styled.TextButton : alt ? Styled.AltButton : Styled.Button;
  const navigate = useNavigate();

  return (
    <StyledButton
      as={href ? 'a' : 'button'}
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        to && navigate(to);
      }}
      $active={active}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

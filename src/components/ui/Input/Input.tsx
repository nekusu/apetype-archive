import Styled from './Input.styles';

function Input({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <Styled.Input {...rest} />;
}

export default Input;

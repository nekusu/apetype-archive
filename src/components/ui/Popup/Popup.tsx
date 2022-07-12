import Styled from './Popup.styles';

interface Props {
  children: React.ReactNode;
  top?: boolean;
  maxWidth?: number;
  close: () => void;
}

function Popup({ children, top, maxWidth, close }: Props) {
  return (
    <Styled.Wrapper onClick={close} $top={top}>
      <Styled.Popup onClick={(e) => e.stopPropagation()} $maxWidth={maxWidth}>
        {children}
      </Styled.Popup>
    </Styled.Wrapper>
  );
}

export default Popup;

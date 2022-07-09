import Styled from './Popup.styles';

interface Props {
  children: React.ReactNode;
  maxWidth?: number;
  padding?: number;
  title: string;
  closePopup: () => void;
}

function Popup({ children, maxWidth, padding, title, closePopup }: Props) {
  return (
    <Styled.Wrapper onClick={closePopup}>
      <Styled.Popup
        $maxWidth={maxWidth}
        $padding={padding}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <Styled.Title>{title}</Styled.Title>}
        {children}
      </Styled.Popup>
    </Styled.Wrapper>
  );
}

export default Popup;

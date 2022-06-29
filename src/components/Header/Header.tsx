import { useNavigate } from 'react-router-dom';
import {
  RiKeyboardBoxFill,
  RiVipCrownFill,
  RiInformationFill,
  RiSettingsFill,
  RiLoginCircleFill,
} from 'react-icons/ri';
import Styled from './Header.styles';
import { Button } from '../ui';

function Header() {
  const navigate = useNavigate();

  return (
    <Styled.Header>
      <Styled.Logo onClick={() => navigate('/')}>
        <Styled.Text>
          <Styled.TopText>ape see</Styled.TopText>
          apetype
        </Styled.Text>
      </Styled.Logo>
      <Styled.Menu>
        <Button text title="Home" navigate="/">
          <RiKeyboardBoxFill />
        </Button>
        <Button text title="Leaderboards" navigate="/leaderboards">
          <RiVipCrownFill />
        </Button>
        <Button text title="About" navigate="/about">
          <RiInformationFill />
        </Button>
        <Button text title="Settings" navigate="/settings">
          <RiSettingsFill />
        </Button>
        <Button text title="Login" navigate="/login">
          <RiLoginCircleFill />
        </Button>
      </Styled.Menu>
    </Styled.Header>
  );
}

export default Header;

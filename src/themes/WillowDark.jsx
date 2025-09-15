import { WillowDark } from '@svar-ui/react-core';
import './WillowDark.css';
const WillowDarkComponent = ({ children, fonts }) => {
  return children ? (
    <WillowDark fonts={fonts}>{children}</WillowDark>
  ) : (
    <WillowDark fonts={fonts}></WillowDark>
  );
};
export default WillowDarkComponent;

import { Willow } from '@svar-ui/react-core';
import './Willow.css';
const WillowComponent = ({ children, fonts }) => {
  return children ? (
    <Willow fonts={fonts}>{children}</Willow>
  ) : (
    <Willow fonts={fonts}></Willow>
  );
};
export default WillowComponent;

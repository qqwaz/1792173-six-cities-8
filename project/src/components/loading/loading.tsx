import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { rootStyle } from './styles';

function Loading(): JSX.Element {
  return (
    <div style={rootStyle}>
      <Loader
        type='Oval'
        color='#4481C3'
      />;
    </div>
  );
}

export default Loading;

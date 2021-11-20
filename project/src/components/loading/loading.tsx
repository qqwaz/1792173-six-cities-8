import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function Loading(): JSX.Element {
  return (
    <div style={{position: 'absolute', top: '50%', left: '50%'}}>
      <Loader
        type='Oval'
        color='#4481C3'
      />;
    </div>
  );
}

export default Loading;

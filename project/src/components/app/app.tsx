import MainPage from '../main-page/main-page';

type AppProps = {
  offersCount: number;
}

function App(props: AppProps): JSX.Element {
  const {
    offersCount = 5,
  } = props;

  return (
    <MainPage offersCount={offersCount} />
  );
}

export default App;

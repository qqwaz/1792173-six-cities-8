import MainPage from '../main-page/main-page';
import AuthPage from '../auth-page/auth-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-fount-page';

type AppProps = {
  offersCount: number;
}

function App(props: AppProps): JSX.Element {
  const {
    offersCount = 5,
  } = props;

  return (
    <>
      <MainPage offersCount={offersCount} />
      <AuthPage />
      <FavoritesPage />
      <OfferPage />
      <NotFoundPage />
    </>
  );
}

export default App;

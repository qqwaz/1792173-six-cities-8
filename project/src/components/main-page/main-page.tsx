import MainOfferCardComponent from '../main-offer-card-component/main-offer-card-component';
import MainLocationsComponent from '../main-locations-component/main-locations-component';
import HeaderComponent from '../header-component/header-component';
import { getFakeData } from '../../utils/common';

type MainPageProps = {
  offersCount: number;
}

function MainPage(props: MainPageProps): JSX.Element {
  const {
    offersCount,
  } = props;

  const offers = getFakeData(offersCount);

  return (
    <div className="page page--gray page--main">
      <HeaderComponent />

      <main className="page__main page__main--index">
        <MainLocationsComponent />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">

                {offers.map((x) =>
                  <MainOfferCardComponent key={x.id} />
                  )}

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

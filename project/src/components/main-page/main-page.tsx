import { useState } from 'react';
import PlaceCard from '../place-card/place-card';
import MainLocations from '../main-locations/main-locations';
import Header from '../header/header';
import Sorting from '../sorting/sorting';
import MainEmpty from '../main-empty/main-empty';
import Map from '../map/map';
import { MapComponentVariant, PlaceCardComponentVariant } from '../../const';
import { Offer } from '../../types/offer';

type MainPageProps = {
  offers: Offer[],
}

function MainPage(props: MainPageProps): JSX.Element {
  const {
    offers,
  } = props;

  const isEmpty = !offers.length;

  const [activeOfferId, setActiveOfferId] = useState<number | undefined>();

  const location = offers[0]?.city.location;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <MainLocations />
        <div className="cities">
          {isEmpty
            ? <MainEmpty />
            : (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">312 places to stay in Amsterdam</b>
                  <Sorting />
                  <div className="cities__places-list places__list tabs__content">
                    {offers.map((offer) => (
                      <PlaceCard key={offer.id}
                        variant={PlaceCardComponentVariant.Main}
                        offer={offer}
                        setActiveOfferId={setActiveOfferId}
                      />
                    ))}
                  </div>
                </section>
                <div className="cities__right-section">
                  <Map variant={MapComponentVariant.Main} location={location} offers={offers} activeOfferId={activeOfferId}/>
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;

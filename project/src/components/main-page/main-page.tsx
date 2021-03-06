import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PlaceCard from '../place-card/place-card';
import MainLocations from '../main-locations/main-locations';
import Header from '../header/header';
import Sorting from '../sorting/sorting';
import MainEmpty from '../main-empty/main-empty';
import Map from '../map/map';
import { MapComponentVariant, PlaceCardComponentVariant } from '../../const';
import { getOffersByCity, sortOffers } from '../../utils';
import { getCity, getOffers, getSortType } from '../../store/data/selectors';

function MainPage(): JSX.Element {
  const city = useSelector(getCity);
  const offers = useSelector(getOffers);
  const sortType = useSelector(getSortType);

  const localOffers = useMemo(() => sortOffers(getOffersByCity(city, offers), sortType), [city, offers, sortType]);

  const isEmpty = !localOffers.length;

  const [activeOfferId, setActiveOfferId] = useState<number | undefined>();

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <MainLocations />
        <div className="cities">
          {isEmpty
            ? <MainEmpty city={city}/>
            : (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{localOffers?.length} places to stay in {city?.name}</b>
                  <Sorting />
                  <div className="cities__places-list places__list tabs__content">
                    {localOffers.map((offer) => (
                      <PlaceCard key={offer.id}
                        variant={PlaceCardComponentVariant.Main}
                        offer={offer}
                        setActiveOfferId={setActiveOfferId}
                      />
                    ))}
                  </div>
                </section>
                <div className="cities__right-section">
                  <Map
                    variant={MapComponentVariant.Main}
                    activeOfferId={activeOfferId}
                    offers={localOffers}
                    city={city}
                  />
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;

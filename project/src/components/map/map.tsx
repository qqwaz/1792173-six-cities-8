import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer, Location } from '../../types/offer';
import { MapComponentVariant, URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import useMap from '../../hooks/useMap';

type MapProps = {
  variant: MapComponentVariant,
  location: Location,
  offers: Offer[],
  activeOfferId: number | undefined,
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mapStyle = {
  [MapComponentVariant.Main]: 'cities__map',
  [MapComponentVariant.Offer]: 'property__map',
};

function Map(props: MapProps): JSX.Element {
  const {
    variant,
    location,
    offers,
    activeOfferId,
  } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon: offer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon,
            },
          )
          .addTo(map);
      });
    }
  }, [map, offers, activeOfferId]);

  return <section className={`map ${mapStyle[variant]}`} ref={mapRef}></section>;
}

export default Map;

import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapComponentVariant, URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';

type MapProps = {
  variant: MapComponentVariant,
  offers: Offer[],
  activeOfferId: number | undefined,
  city: City,
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
    offers,
    activeOfferId,
    city,
  } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef);

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
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
  }, [map, offers, activeOfferId, city]);

  return <section className={`${mapStyle[variant]} map`} ref={mapRef}></section>;
}

export default Map;

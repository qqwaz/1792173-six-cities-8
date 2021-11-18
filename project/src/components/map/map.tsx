import React, { useEffect, useRef, CSSProperties } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer, Location } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import useMap from '../../hooks/useMap';

type MapProps = {
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

const mapStyle: CSSProperties = {height: '500px'};

function Map({location, offers, activeOfferId}: MapProps): JSX.Element {
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

  return <section className="cities__map map" style={mapStyle} ref={mapRef}></section>;
}

export default Map;

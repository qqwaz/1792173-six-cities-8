import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import leaflet, { LayerGroup }  from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapComponentVariant, URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offer';
import { getCity } from '../../store/data/selectors';

type MapProps = {
  variant: MapComponentVariant,
  activeOfferId: number | undefined,
  offers: Offer[],
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

const markers: LayerGroup = leaflet.layerGroup([]);

function Map(props: MapProps): JSX.Element {
  const {
    variant,
    offers,
    activeOfferId,
  } = props;
  const city = useSelector(getCity);

  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      markers?.clearLayers();
      offers.forEach((offer) => {
        markers.addLayer(
          leaflet
            .marker(
              {
                lat: offer.location.latitude,
                lng: offer.location.longitude,
              },
              {
                icon: offer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon,
              },
            ));
      });
      markers.addTo(map);
    }
  }, [map, offers, activeOfferId]);

  return <section className={`${mapStyle[variant]} map`} ref={mapRef}></section>;
}

export default Map;

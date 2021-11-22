import React, { useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import leaflet, { LayerGroup }  from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapComponentVariant, URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';

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

const mapStateToProps = ({city}: State) => ({
  city,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MapProps;

const markers: LayerGroup = leaflet.layerGroup([]);

function Map(props: ConnectedComponentProps): JSX.Element {
  const {
    variant,
    city,
    offers,
    activeOfferId,
  } = props;

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

export { Map };
export default connector(Map);

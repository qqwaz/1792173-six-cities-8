import { getFakeData } from '../../utils';

function OfferGallery(): JSX.Element {

  const pics = getFakeData(5);

  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {pics.map((x) => (
          <div key={x.id} className="property__image-wrapper">
            <img className="property__image" src="img/room.jpg" alt="Studio" />
          </div>))}
      </div>
    </div>
  );
}

export default OfferGallery;

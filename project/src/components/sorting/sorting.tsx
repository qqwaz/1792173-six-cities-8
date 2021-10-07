import { SortTypes, SortTypeTitles } from '../../const';

function Sorting(): JSX.Element {

  const currentSort = SortTypes.ToHigh;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {SortTypeTitles[currentSort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {Object.keys(SortTypes).map((x) => (
          <li key={x} className={`places__option ${SortTypes[x as keyof typeof SortTypes] === currentSort && 'places__option--active'}`} tabIndex={0}>
            {SortTypeTitles[SortTypes[x as keyof typeof SortTypes]]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;

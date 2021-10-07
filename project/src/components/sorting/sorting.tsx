import { SortType, SortTypeTitle } from '../../const';

function Sorting(): JSX.Element {

  const currentSort = SortType.ToHigh;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {SortTypeTitle[currentSort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {Object.keys(SortType).map((x) => (
          <li key={x} className={`places__option ${SortType[x as keyof typeof SortType] === currentSort && 'places__option--active'}`} tabIndex={0}>
            {SortTypeTitle[SortType[x as keyof typeof SortType]]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;

import { useRef, useState, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSortType } from '../../store/action';
import { SortType, SortTypeTitle } from '../../const';
import { getSortType } from '../../store/data/selectors';

function Sorting(): JSX.Element {
  const sortType = useSelector(getSortType);
  const dispatch = useDispatch();

  const sortingRef = useRef(null);

  const [isOpened, setIsOpened] = useState(false);
  const openedStyle = isOpened ? ' places__options--opened' : '';
  const onSortingClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsOpened(!isOpened);
  };

  const onSelectType = (newSortType: SortType) => (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(changeSortType(newSortType));
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={onSortingClick}>
        {SortTypeTitle[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${openedStyle}`}
        ref={sortingRef}
      >
        {Object.keys(SortType).map((x) => (
          <li key={x} className={`places__option ${x === sortType && 'places__option--active'}`} tabIndex={0}
            onClick={onSelectType(SortType[x as keyof typeof SortType])}
          >
            {SortTypeTitle[SortType[x as keyof typeof SortType]]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;

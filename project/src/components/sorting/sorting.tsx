import { useRef, useState, SyntheticEvent } from 'react';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { changeSortType as changeSortTypeState } from '../../store/action';
import { SortType, SortTypeTitle } from '../../const';

const mapStateToProps = ({ sortType }: State) => ({
  sortType,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) =>
  bindActionCreators(
    {
      changeSortType: changeSortTypeState,
    },
    dispatch,
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Sorting(props: PropsFromRedux): JSX.Element {
  const {
    sortType,
    changeSortType,
  } = props;

  const sortingRef = useRef(null);

  const [isOpened, setIsOpened] = useState(false);
  const openedStyle = isOpened ? ' places__options--opened' : '';
  const onSortingClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsOpened(!isOpened);
  };

  const onSelectType = (newSortType: SortType) => (e: SyntheticEvent) => {
    e.preventDefault();
    changeSortType(newSortType);
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

export { Sorting };
export default connector(Sorting);

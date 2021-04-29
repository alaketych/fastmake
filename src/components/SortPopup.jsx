import React, {
  useState,
  useRef,
  useEffect,
} from 'react';

function SortPopup({
  items,
  activeSortType,
  onClickSortType,
}) {
  const [visiblePopup, setVisiblePopup] = useState(false)
  const sortRef = useRef();
  const activeLabel = (items.find((obj) => obj.type === activeSortType) || {}).name

  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup)
  }

  const onSelectItem = (index) => {
    onClickSortType(index);
    setVisiblePopup(false);
  }

  const handleOutsideClick = event => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(sortRef.current)) {
      setVisiblePopup(false);
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Sorted by:</b>
        {<span onClick={ toggleVisiblePopup } className="sort_name">{ activeLabel }</span>}
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {items &&
              items.map((obj, index) => (
                <li
                  onClick={() => onSelectItem(obj)}
                  className={activeSortType === obj.type ? 'active' : ''}
                  key={`${obj.type}_${index}`}>
                  {obj.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}

SortPopup.defaultProps = {
  items: [],
  onSelectItem: () => {
  },
  onClickSortType: () => {
  },
}

export default SortPopup;
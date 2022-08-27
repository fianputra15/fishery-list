import React from 'react';

const SortButton: React.FC<any> = (props) => {
  const { title, setStateSortIcon, stateSortIcon } = props;
  //   const [clickedSort, setClickedSort]: any = useState(0);
  const handleChangeSort = () => {
    // setClickedSort((num: number) => num + 1);
    if (stateSortIcon?.heading === title && stateSortIcon?.type === 'asc') {
      setStateSortIcon({
        heading: title,
        type: 'desc',
      });
    } else if (
      stateSortIcon?.heading === title &&
      stateSortIcon?.type === 'desc'
    ) {
      setStateSortIcon({
        heading: title,
        type: '',
      });
    } else {
      setStateSortIcon({
        heading: title,
        type: 'asc',
      });
    }
  };

  return (
    <div>
      <button type="button" onClick={() => handleChangeSort()}>
        {' '}
        {stateSortIcon?.heading === title && stateSortIcon?.type === 'desc' && (
          <span
            style={{
              transform: 'unset',
            }}
            className="material-icons"
          >
            filter_list
          </span>
        )}
        {stateSortIcon?.heading === title && stateSortIcon?.type === 'asc' && (
          <span
            style={{
              transform: 'rotate(180deg)',
            }}
            className="material-icons"
          >
            filter_list
          </span>
        )}
        {stateSortIcon?.heading === title && stateSortIcon?.type === '' && (
          <span className="material-icons">sort</span>
        )}
        {stateSortIcon?.heading !== title && (
          <span className="material-icons">sort</span>
        )}
      </button>
      <span> {title}</span>
    </div>
  );
};

export default SortButton;

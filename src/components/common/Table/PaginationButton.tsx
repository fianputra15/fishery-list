import React, { ReactNode } from 'react';
interface PaginationButtonType {
  status: boolean;
  additionalValue?: any;
  isClick: any;
  children: ReactNode;
}
export const PaginationButton: React.FC<PaginationButtonType> = (props) => {
  const { status, isClick, children, additionalValue } = props;
  return (
    <button
      onClick={() => isClick(additionalValue)}
      disabled={status}
      style={{
        opacity: status ? '.5' : '100',
      }}
    >
      {/* {'<<'} */}
      {children}
    </button>
  );
};

export default PaginationButton;

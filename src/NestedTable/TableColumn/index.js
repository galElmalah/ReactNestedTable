import * as React from 'react';
import * as style from './TableColumn.scss';

export const TableColumn = ({ children, index, ...props }) => {
  return (
    <span
      role="cell"
      className={`${style.col} ${style[`col-${index}`]}`}
      {...props}
    >
      {children}
    </span>
  );
};

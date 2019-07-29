import * as React from 'react';
import * as style from './FirstTableRow.scss';
import { DisplaySubTitle } from '../../DisplaySubTitle';
import { TableColumn } from '../TableColumn';

export const FirstTableRow = ({ title }) => (
  <React.Fragment>
    <h3>{title}</h3>
    <div role="row" className={style.firstRow}>
      <TableColumn index={1} role="columnheader">
        <DisplaySubTitle subtitle={'NAME'} />
      </TableColumn>
      <TableColumn index={2} role="columnheader">
        <DisplaySubTitle subtitle={'TYPE'} />
      </TableColumn>
      <TableColumn index={3} role="columnheader">
        <DisplaySubTitle subtitle={'DESCRIPTION'} />
      </TableColumn>
    </div>
  </React.Fragment>
);

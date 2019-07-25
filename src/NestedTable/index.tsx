import * as React from 'react';
import * as style from './CustomTable.scss';
import ReactMarkdown from 'react-markdown';
import {
  isPrimitiveType,
  getTypeDisplayName,
  transformEnumData,
  isEnumType,
  memberIsNotEmpty,
  extractType,
  getMemberFromType,
  PRIMITIVES
} from './utils';
import { FirstTableRow } from './FirstTableRow';
import { CustomTableNameDisplay } from './CustomTableNameDisplay';
import { TableColumn } from './TableColumn';

export const TABLE_TYPES = {
  REQUEST: 'REQUEST',
};

interface DataMember {
  name: string;
  type: string;
  doc: string;
  required?: boolean;
  readOnly?: boolean;
}


interface NestedTableProps {
  extractor(type: string): DataMember | undefined;
  data: DataMember[];
}


export const NestedTable = () => {
  constructor(props) {
    super(props);
    this.state = {
      openTableIndexes: {},
      enterAnimation: false,
    };
  }

  isReadOnly = isReadOnly => {
    return isReadOnly && this.props.tableType === TABLE_TYPES.REQUEST;
  };

  isFirstLevel = () => this.props.tableDepth === 0;

  hasIndex = index => this.state.openTableIndexes.hasOwnProperty(index);

  isTableOpen = index => this.state.openTableIndexes[index];

  addTableIndex = index => {
    this.setState(prevState => ({
      openTableIndexes: { ...prevState.openTableIndexes, [index]: true },
    }));
  };

  toggleExistingTableIndex = index => {
    this.setState(prevState => ({
      openTableIndexes: {
        ...prevState.openTableIndexes,
        [index]: !prevState.openTableIndexes[index],
      },
    }));
  };

  toggleTables = index => () => {
    if (this.hasIndex(index)) {
      this.toggleExistingTableIndex(index);
    } else {
      this.addTableIndex(index);
    }
  };

  componentDidMount() {
    if (this.props.tableDepth > 0) {
      setTimeout(() => this.setState({ enterAnimation: true }), 5);
    }
  }

  generateRows = () => {
    return this.props.data.map(({ name, type, doc, required, readOnly }, i) => {
      if (this.isReadOnly(readOnly)) {
        return null;
      }
      return (
        <React.Fragment>
          <div role="row" key={`${name}_${type}`} className={style.row}>
            <TableColumn index={1}>
              <CustomTableNameDisplay
                onIconClick={this.toggleTables(i)}
                name={name}
                required={required}
                isRotated={this.isTableOpen(i)}
                type={extractType(type)}
              />
            </TableColumn>
            <TableColumn index={2}>
              {<p>{getTypeDisplayName(type)}</p>}
            </TableColumn>
            <TableColumn index={3}>
              <p>
                <ReactMarkdown source={doc} />
              </p>
            </TableColumn>
          </div>
          {this.shouldRenderTable(type, i)}
        </React.Fragment>
      );
    });
  };

  getTableData = member =>
    isEnumType(member) ? transformEnumData(member) : member.members;

  shouldRenderTable = (type, index) => {
    if (!isPrimitiveType(type)) {
      const member = getMemberFromType(type);

      if (memberIsNotEmpty(member) && this.isTableOpen(index)) {
        const data = this.getTableData(member);
        return (
          <CustomTable
            tableDepth={this.props.tableDepth + 1}
            data={data}
            tableType={this.props.tableType}
          />
        );
      }
    }
    return null;
  };

  render() {
    const { enterAnimation } = this.state;
    const { title, tableDepth } = this.props;
    return (
      <div
        role="table"
        aria-label="Object-attribute"
        className={`${style.tableWrapper} ${
          enterAnimation ? style.animate : ''
          } ${style[`depth-${tableDepth}`]}`}
      >
        {this.isFirstLevel() && <FirstTableRow title={title} />}
        {this.generateRows()}
      </div>
    );
  }
}
